const { MercadoPagoConfig, Preference, Payment } = require("mercadopago");
const Order = require("../models/Order");
const Product = require("../models/productModel");

// ✅ SDK nuevo: token con trim (evita espacios invisibles)
const mpClient = new MercadoPagoConfig({
  accessToken: (process.env.MP_ACCESS_TOKEN || "").trim()
});

// ✅ helper: normaliza FRONT_URL y asegura formato válido
function getFrontUrl() {
  const raw = (process.env.FRONT_URL || "").trim();

  // ✅ fallback (si tu front está en 5173, deja 5173)
  const fallback = "http://localhost:5173";

  let url = (raw || fallback).replace(/\/+$/, ""); // quita / final

  if (!/^https?:\/\//i.test(url)) {
    url = `http://${url.replace(/^\/+/, "")}`.replace(/\/+$/, "");
  }

  return url;
}

// ✅ helper: determina si estamos en local/HTTP
function isLocalOrHttp(frontUrl) {
  const u = (frontUrl || "").toLowerCase();
  const isLocal = u.includes("localhost") || u.includes("127.0.0.1");
  const isHttp = u.startsWith("http://");
  return isLocal || isHttp;
}

// ✅ CHECKOUT: recibe items del FRONT y crea una orden PENDING
exports.checkout = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body; // [{ id, quantity }]

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Carrito vacío" });
    }

    // Validar productos y stock desde DB (seguridad)
    const orderProducts = [];
    let total = 0;

    for (const item of items) {
      const product = await Product.findById(item.id);
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      const qty = Number(item.quantity || 1);
      if (!Number.isFinite(qty) || qty <= 0) {
        return res.status(400).json({ message: "Cantidad inválida" });
      }

      if (product.stock < qty) {
        return res.status(400).json({ message: `Stock insuficiente para ${product.name}` });
      }

      orderProducts.push({
        product: product._id,
        quantity: qty,
        price: product.price
      });

      total += product.price * qty;
    }

    // Crear orden "pending" ANTES de pagar (para luego confirmarla)
    const order = new Order({
      user: userId,
      products: orderProducts,
      total,
      status: "pending"
    });

    await order.save();

    // ✅ FRONT_URL blindado + back_urls SIEMPRE definidos
    const frontUrl = getFrontUrl();

    // ✅ Para evitar problemas con auto_return/validación, dejamos rutas limpias
    // (en success/failure/pending puedes llamar a /api/order/confirm pasando orderId)
    const backUrls = {
      success: `${frontUrl}/checkout/success`,
      failure: `${frontUrl}/checkout/failure`,
      pending: `${frontUrl}/checkout/pending`
    };

    // ✅ DEBUG
    console.log("FRONT_URL env raw:", process.env.FRONT_URL);
    console.log("FRONT_URL normalized:", frontUrl);
    console.log("MP back_urls:", backUrls);

    // Items para MercadoPago (idealmente nombre real)
    const mpItems = [];
    for (const op of orderProducts) {
      const p = await Product.findById(op.product).select("name");
      mpItems.push({
        title: p?.name || "Producto",
        quantity: op.quantity,
        unit_price: op.price,
        currency_id: "CLP"
      });
    }

    const preference = new Preference(mpClient);

    // ✅ En local/http, MercadoPago puede rechazar auto_return (invalid_auto_return).
    // Por eso lo activamos SOLO si la URL no es local y es https.
    const body = {
      items: mpItems,
      back_urls: backUrls,
      metadata: { userId: String(userId), orderId: String(order._id) }
    };

    if (!isLocalOrHttp(frontUrl)) {
      body.auto_return = "approved";
    } else {
      // log para saber por qué no se setea auto_return
      console.log("auto_return desactivado (local/http) para evitar invalid_auto_return");
    }

    console.log("MP preference body:", JSON.stringify(body, null, 2));

    const response = await preference.create({ body });

    return res.status(200).json({
      orderId: order._id,
      preferenceId: response.id,
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point
    });
  } catch (error) {
    console.error("MP ERROR message:", error?.message);
    console.error("MP ERROR status:", error?.status);
    console.error("MP ERROR cause:", error?.cause);
    console.error("MP ERROR response:", error?.response?.data);
    console.error("MP ERROR raw:", error);

    return res.status(500).json({
      message: error?.response?.data?.message || error.message || "Error creando preferencia",
      mp: error?.response?.data || null
    });
  }
};

// ✅ CONFIRM: verifica pago y marca la orden como PAID + descuenta stock
exports.confirmPayment = async (req, res) => {
  try {
    const userId = req.user.id;

    const paymentId =
      req.body.payment_id ||
      req.body.collection_id ||
      req.query.payment_id ||
      req.query.collection_id;

    const orderId = req.body.orderId || req.query.orderId;

    if (!paymentId) {
      return res.status(400).json({ message: "Falta payment_id/collection_id" });
    }
    if (!orderId) {
      return res.status(400).json({ message: "Falta orderId" });
    }

    const paymentApi = new Payment(mpClient);
    const payment = await paymentApi.get({ id: paymentId });

    if (!payment) {
      return res.status(400).json({ message: "No se pudo obtener el pago desde MercadoPago" });
    }

    if (payment.status !== "approved") {
      return res.status(400).json({
        message: `Pago no aprobado. Estado: ${payment.status}`,
        paymentStatus: payment.status
      });
    }

    const order = await Order.findById(orderId).populate("products.product");
    if (!order) return res.status(404).json({ message: "Orden no encontrada" });

    // Seguridad: la orden debe ser del usuario
    if (String(order.user) !== String(userId)) {
      return res.status(403).json({ message: "No autorizado para confirmar esta orden" });
    }

    if (order.status === "paid") {
      return res.json({ message: "Orden ya estaba pagada", order });
    }

    // Descontar stock ahora
    for (const item of order.products) {
      const product = await Product.findById(item.product._id);
      if (!product) return res.status(400).json({ message: "Producto no encontrado" });

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Stock insuficiente para ${product.name}` });
      }

      product.stock -= item.quantity;
      await product.save();
    }

    order.status = "paid";
    order.payment = {
      provider: "mercadopago",
      paymentId: String(paymentId),
      status: payment.status
    };

    await order.save();

    return res.status(200).json({ message: "Pago confirmado y orden pagada", order });
  } catch (error) {
    console.error("MP CONFIRM ERROR:", error?.response?.data || error);
    return res.status(500).json({ message: error.message || "Error confirmando pago" });
  }
};

// 📦 Obtener mis órdenes
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("products.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📄 Obtener orden por ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("products.product");
    if (!order) return res.status(404).json({ message: "Orden no encontrada" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Health check MercadoPago (sirve para validar el token)
exports.mpHealth = async (req, res) => {
  try {
    const token = (process.env.MP_ACCESS_TOKEN || "").trim();
    const r = await fetch("https://api.mercadopago.com/users/me", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await r.json().catch(() => ({}));
    return res.status(r.status).json({
      status: r.status,
      data
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
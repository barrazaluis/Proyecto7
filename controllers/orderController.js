const Order = require("../models/Order")
const Cart = require("../models/Cart")
const Product = require("../models/productModel")

// 🔥 CHECKOUT
exports.checkout = async (req, res) => {
  try {
    const userId = req.user.id

    const cart = await Cart.findOne({ user: userId })
      .populate("products.product")

    if (!cart || cart.products.length === 0)
      return res.status(400).json({ message: "Carrito vacío" })

    let orderProducts = []
    let total = 0

    // 🔥 Verificar stock y preparar orden
    for (let item of cart.products) {
      const product = await Product.findById(item.product._id)

      if (product.stock < item.quantity)
        return res.status(400).json({
          message: `Stock insuficiente para ${product.name}`
        })

      // Descontar stock
      product.stock -= item.quantity
      await product.save()

      orderProducts.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      })

      total += product.price * item.quantity
    }

    // Crear orden
    const order = new Order({
      user: userId,
      products: orderProducts,
      total,
      status: "paid"
    })

    await order.save()

    // Vaciar carrito
    cart.products = []
    cart.total = 0
    await cart.save()

    res.status(201).json(order)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// 📦 Obtener mis órdenes
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("products.product")

    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// 📄 Obtener orden por ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("products.product")

    if (!order)
      return res.status(404).json({ message: "Orden no encontrada" })

    res.json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
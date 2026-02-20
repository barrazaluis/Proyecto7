const Cart = require("../models/Cart")
const Product = require("../models/productModel")

// 🛒 Agregar producto
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body
    const userId = req.user.id

    const product = await Product.findById(productId)
    if (!product)
      return res.status(404).json({ message: "Producto no existe" })

    if (product.stock < quantity)
      return res.status(400).json({ message: "Stock insuficiente" })

    let cart = await Cart.findOne({ user: userId })

    if (!cart) {
      cart = new Cart({
        user: userId,
        products: [],
        total: 0
      })
    }

    const existingProduct = cart.products.find(
      p => p.product.toString() === productId
    )

    if (existingProduct) {
      existingProduct.quantity += quantity
    } else {
      cart.products.push({ product: productId, quantity })
    }

    // 🔥 Recalcular total
    let total = 0
    for (let item of cart.products) {
      const prod = await Product.findById(item.product)
      total += prod.price * item.quantity
    }

    cart.total = total
    await cart.save()

    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// 🛒 Obtener carrito
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate("products.product")

    if (!cart)
      return res.json({ message: "Carrito vacío" })

    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ❌ Eliminar producto del carrito
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params
    const cart = await Cart.findOne({ user: req.user.id })

    if (!cart)
      return res.status(404).json({ message: "Carrito no encontrado" })

    cart.products = cart.products.filter(
      p => p.product.toString() !== productId
    )

    // recalcular total
    let total = 0
    for (let item of cart.products) {
      const prod = await Product.findById(item.product)
      total += prod.price * item.quantity
    }

    cart.total = total
    await cart.save()

    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// 🗑 Vaciar carrito
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })

    if (!cart)
      return res.status(404).json({ message: "Carrito no encontrado" })

    cart.products = []
    cart.total = 0

    await cart.save()

    res.json({ message: "Carrito vaciado" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
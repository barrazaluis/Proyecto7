const Cart = require("../models/Cart")
const Product = require("../models/productModel")

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body

    let cart = await Cart.findOne({ user: req.user.id })

    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        products: []
      })
    }

    const productExists = cart.products.find(
      p => p.product.toString() === productId
    )

    if (productExists) {
      productExists.quantity += quantity
    } else {
      cart.products.push({
        product: productId,
        quantity
      })
    }

    await cart.save()

    res.status(200).json(cart)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate("products.product")

    res.status(200).json(cart)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
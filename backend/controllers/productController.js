const Product = require("../models/productModel")

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {

    if (!req.body.name || !req.body.price) {
      return res.status(400).json({
        message: "Name and price are required"
      })
    }

    const product = await Product.create({
      ...req.body,
      user: req.user?.id || null
    })

    res.status(201).json(product)

  } catch (error) {
    res.status(500).json({
      message: "Error creating product",
      error: error.message
    })
  }
}

// GET ALL PRODUCTS
exports.readAll = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("user", "username email")

    res.json(products)

  } catch (error) {
    res.status(500).json({
      message: "Error fetching products"
    })
  }
}


// GET ONE PRODUCT
exports.readOne = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      })
    }

    res.json(product)

  } catch (error) {
    res.status(500).json({
      message: "Error fetching product"
    })
  }
}


// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      })
    }

    res.json(product)

  } catch (error) {
    res.status(500).json({
      message: "Error updating product"
    })
  }
}


// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      })
    }

    res.json({ message: "Product deleted" })

  } catch (error) {
    res.status(500).json({
      message: "Error deleting product"
    })
  }
}
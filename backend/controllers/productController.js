const Product = require("../models/productModel")

exports.createProduct = async (req, res) => {
  const { name, description, price } = req.body

  try {
    const product = await Product.create({
      name,
      description,
      price,
      user: req.user.id
    })
    res.json(product)
  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.readAll = async (req, res) => {
  const products = await Product.find().populate("user", "username email")
  res.json(products)
}

exports.readOne = async (req, res) => {
  const product = await Product.findById(req.params.id)
  res.json(product)
}

exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.json(product)
}

exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)
  res.json(product)
}

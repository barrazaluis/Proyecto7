const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  stock: {
  type: Number,
  required: true,
  default: 0
}
}, {
  timestamps: true
})

module.exports = mongoose.model("Product", productSchema)

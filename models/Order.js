const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },
        quantity: Number,
        price: Number // 🔥 precio congelado al momento de compra
      }
    ],
    total: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered"],
      default: "pending"
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Order", orderSchema)
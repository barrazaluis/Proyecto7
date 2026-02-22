const mongoose = require("mongoose")

const variantSchema = new mongoose.Schema(
  {
    size: { type: String, required: true, trim: true },   // "40" o "M"
    stock: { type: Number, default: 0 }
  },
  { _id: false }
)

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    category: {
      type: String,
      default: "General"
    },

    brand: {
      type: String,
      default: ""
    },

    // ✅ tipo de tallas que mostrará el frontend
    sizeType: {
      type: String,
      enum: ["shoe", "apparel", "none"],
      default: "none"
    },

    // ✅ variantes por talla (con stock)
    variants: {
      type: [variantSchema],
      default: []
    },

    // (Opcional) stock general. Si usas variants, puedes ignorarlo o mantenerlo.
    stock: {
      type: Number,
      default: 0
    },

    images: [
      {
        type: String
      }
    ],

    isActive: {
      type: Boolean,
      default: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("Product", productSchema)
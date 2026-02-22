const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  address: {
    fullName: { type: String, trim: true },
    phone: { type: String, trim: true },
    rut: { type: String, trim: true }, // opcional
    street: { type: String, trim: true },
    number: { type: String, trim: true },
    apartment: { type: String, trim: true },
    commune: { type: String, trim: true },
    city: { type: String, trim: true },
    region: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    notes: { type: String, trim: true }
  } // ← ESTA llave faltaba conceptualmente para cerrar el objeto principal
}, { // ← Opciones del schema (ahora sí está bien ubicado)
  timestamps: true
})

module.exports = mongoose.model("User", userSchema)
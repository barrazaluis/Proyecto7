const express = require("express")
const cors = require("cors")
require("dotenv").config()

const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")
const { swaggerUi, swaggerSpec } = require("./swagger")

const app = express() // ✅ PRIMERO se crea app

// Conexión a DB
connectDB()

// Middlewares
app.use(cors())
app.use(express.json())

// Rutas
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes) // ✅ AHORA sí

// Ruta raíz
app.get("/", (req, res) => {
  res.json({ message: "API funcionando correctamente" })
})

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Puerto
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
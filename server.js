const express = require("express")
const cors = require("cors")
require("dotenv").config()

const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const { swaggerUi, swaggerSpec } = require("./swagger")

const app = express()

// Conexión a DB
connectDB()

// Middlewares
app.use(cors())
app.use(express.json())

// Rutas
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)

// Ruta raíz (para Render / verificación)
app.get("/", (req, res) => {
  res.json({ message: "API funcionando correctamente" })
})

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Puerto (Render usa process.env.PORT)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Proyecto 7 eCommerce API",
      version: "1.0.0",
      description: "API con JWT, Roles, Carrito y Stripe"
    },
    servers: [
      {
        url: process.env.NODE_ENV === "production"
          ? "https://TU-URL-DE-RENDER.onrender.com"
          : "http://localhost:3000"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },

  // Swagger leerá todos los archivos dentro de routes
  apis: ["./routes/*.js"]
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = {
  swaggerUi,
  swaggerSpec
}
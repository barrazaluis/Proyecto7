const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Proyecto 6 API",
      version: "1.0.0",
      description: "API con JWT, MongoDB y Express"
    },
    servers: [
      {
        url: "https://proyecto-6-3c7e.onrender.com/"
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
  apis: ["./routes/*.js"] // donde están tus rutas
}

module.exports = {
  swaggerUi,
  swaggerSpec: swaggerJsdoc(options)
}

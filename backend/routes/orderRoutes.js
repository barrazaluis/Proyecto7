const express = require("express")
const router = express.Router()
const auth = require("../middleware/authorization")

const {
  checkout,
  getMyOrders,
  getOrderById
} = require("../controllers/orderController")

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Gestión de órdenes
 */

/**
 * @swagger
 * /api/order/checkout:
 *   post:
 *     summary: Realizar checkout
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
router.post("/checkout", auth, checkout)

/**
 * @swagger
 * /api/order/myorders:
 *   get:
 *     summary: Obtener mis órdenes
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
router.get("/myorders", auth, getMyOrders)

/**
 * @swagger
 * /api/order/{id}:
 *   get:
 *     summary: Obtener orden por ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", auth, getOrderById)

module.exports = router
const express = require("express")
const router = express.Router()
const auth = require("../middleware/authorization")

const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart
} = require("../controllers/cartController")

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Gestión del carrito de compras
 */

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Agregar producto al carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Producto agregado al carrito
 *       401:
 *         description: No autorizado
 */
router.post("/add", auth, addToCart)

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Obtener carrito del usuario
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrito obtenido correctamente
 *       401:
 *         description: No autorizado
 */
router.get("/", auth, getCart)

/**
 * @swagger
 * /api/cart/remove/{productId}:
 *   delete:
 *     summary: Eliminar un producto del carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado del carrito
 *       401:
 *         description: No autorizado
 */
router.delete("/remove/:productId", auth, removeFromCart)

/**
 * @swagger
 * /api/cart/clear:
 *   delete:
 *     summary: Vaciar carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrito vaciado
 *       401:
 *         description: No autorizado
 */
router.delete("/clear", auth, clearCart)

module.exports = router
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorization");
const isAdmin = require("../middleware/isAdmin");
const {
  createProduct,
  readAll,
  readOne,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gestión de productos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductVariant:
 *       type: object
 *       required:
 *         - size
 *         - stock
 *       properties:
 *         size:
 *           type: string
 *           example: "41"
 *         stock:
 *           type: number
 *           example: 10
 *
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           example: Mochila Trekking 45L
 *         description:
 *           type: string
 *           example: Mochila impermeable ideal para montaña
 *         price:
 *           type: number
 *           example: 59990
 *         category:
 *           type: string
 *           example: Outdoor
 *         brand:
 *           type: string
 *           example: Doite
 *         sizeType:
 *           type: string
 *           description: Tipo de tallaje del producto
 *           enum: [shoe, apparel, none]
 *           example: shoe
 *         variants:
 *           type: array
 *           description: Variantes por talla con stock (si sizeType es shoe/apparel)
 *           items:
 *             $ref: '#/components/schemas/ProductVariant'
 *         stock:
 *           type: number
 *           description: Stock general (opcional si usas variants)
 *           example: 20
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - /img/products/mochila.jpg
 *         isActive:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /api/product/create:
 *   post:
 *     summary: Crear un producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post("/create", auth, isAdmin, createProduct);

/**
 * @swagger
 * /api/product/readall:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get("/readall", readAll);

/**
 * @swagger
 * /api/product/readone/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get("/readone/:id", readOne);

/**
 * @swagger
 * /api/product/update/{id}:
 *   put:
 *     summary: Actualizar producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado
 */
router.put("/update/:id", auth, isAdmin, updateProduct);

/**
 * @swagger
 * /api/product/delete/{id}:
 *   delete:
 *     summary: Eliminar producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado
 */
router.delete("/delete/:id", auth, isAdmin, deleteProduct);

module.exports = router;
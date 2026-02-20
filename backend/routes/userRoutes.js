const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorization");
const {
  register,
  login,
  verifyToken,
  updateUser
} = require("../controllers/userController");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Autenticación y gestión de usuarios
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 */
router.post("/register", register);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Retorna token JWT
 */
router.post("/login", login);

/**
 * @swagger
 * /api/user/verifytoken:
 *   get:
 *     summary: Verificar token del usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token válido
 *       401:
 *         description: Token inválido o no enviado
 */
router.get("/verifytoken", auth, verifyToken);

/**
 * @swagger
 * /api/user/update:
 *   put:
 *     summary: Actualizar datos del usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */
router.put("/update", auth, updateUser);

module.exports = router;

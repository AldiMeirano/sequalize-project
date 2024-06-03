/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The user's username
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         id: 1
 *         username: johndoe
 *         email: johndoe@example.com
 *         password: yourpassword
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user managing API
 */

/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: The user was successfully logged in
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/user/verified:
 *   post:
 *     summary: Verify a user code
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               code:
 *                 type: string
 *             required:
 *               - email
 *               - code
 *     responses:
 *       200:
 *         description: The user was successfully verified
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/v1/user/forgot-password:
 *   post:
 *     summary: Send forgot password email
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: The email was successfully sent
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/v1/user/reset-password:
 *   patch:
 *     summary: Reset a user's password
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
 *               newPassword:
 *                 type: string
 *             required:
 *               - newPassword
 *     responses:
 *       200:
 *         description: The password was successfully reset
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/v1/user/photo-profile:
 *   patch:
 *     summary: Upload a profile picture
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: The profile picture was successfully uploaded
 *       400:
 *         description: Bad request
 */

const userController = require("../controllers/userController");
const verifyToken = require("../middleware/jwt");
const uploader = require("../middleware/uploader");

const router = require("express").Router();

router.post("/register", userController.registerAccount);
router.post("/login", userController.loginAccount);
router.post("/verified", userController.verifiedCode);
router.post("/forgot-password", userController.forgotPassword);
router.patch("/reset-password", verifyToken, userController.resetPassword);
router.patch(
  "/photo-profile/v1",
  verifyToken,
  uploader("IMG", "/profile").single("file"),
  userController.uploadPicture
);

module.exports = router;

const bookController = require("../controllers/bookController");
const verifyToken = require("../middleware/jwt");
const router = require("express").Router();

/**
 * @swagger
 * /book:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - quantity
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the book
 *         image:
 *           type: string
 *           description: URL of the book image
 *         quantity:
 *           type: integer
 *           description: The quantity of the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         status:
 *           type: string
 *           enum: [available, unavailable]
 *           description: The availability status of the book
 *       example:
 *         id: 1
 *         image: "http://example.com/image.jpg"
 *         quantity: 10
 *         title: "The Great Book"
 *         author: "John Doe"
 *         status: "available"
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 */

/**
 * @swagger
 * /api/book:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

/**
 * @swagger
 * /api/book/add-book:
 *   post:
 *     summary: Adds a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/book/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 */

/**
 * @swagger
 * /api/book/{id}:
 *   patch:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The book id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The book was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/book/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The book id
 *     requestBody:
 *       description: Optional request body for additional validation
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               confirmation:
 *                 type: boolean
 *                 description: Confirmation to delete the book
 *             example:
 *               confirmation: true
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 */
router.get("/", bookController.getAllDataBook);
router.post("/add-book", verifyToken, bookController.addNewBook);
router.get("/:id", bookController.getOneBook);
router.patch("/:id", verifyToken, bookController.updateDataBook);
router.delete("/:id", verifyToken, bookController.deleteDataBook);

module.exports = router;

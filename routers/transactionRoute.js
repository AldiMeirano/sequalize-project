const transactionController = require("../controllers/transactionController");
const uploader = require("../middleware/uploader");
const router = require("express").Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - bookId
 *         - userId
 *         - dueDate
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the transaction
 *         bookId:
 *           type: integer
 *           description: The ID of the book
 *         userId:
 *           type: integer
 *           description: The ID of the user
 *         issueDate:
 *           type: string
 *           format: date
 *           description: The date the book was issued
 *         dueDate:
 *           type: string
 *           format: date
 *           description: The date the book is due to be returned
 *         returnDate:
 *           type: string
 *           format: date
 *           description: The date the book was returned
 *         penalty:
 *           type: number
 *           description: Penalty for late return
 *         status:
 *           type: string
 *           enum: [issued, returned, overdue]
 *           description: The status of the transaction
 *       example:
 *         id: 1
 *         bookId: 101
 *         userId: 202
 *         issueDate: 2023-05-01
 *         dueDate: 2023-05-15
 *         returnDate: 2023-05-16
 *         penalty: 5.00
 *         status: "overdue"
 */

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: The transactions managing API
 */

/**
 * @swagger
 * /api/transaction/v1:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: The transaction was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/transaction/v1/{id}:
 *   get:
 *     summary: Get a transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The transaction id
 *     responses:
 *       200:
 *         description: The transaction description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: The transaction was not found
 */

/**
 * @swagger
 * /api/transaction/penalty/v1:
 *   patch:
 *     summary: Calculate penalty for a transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The transaction id
 *             example:
 *               id: 1
 *     responses:
 *       200:
 *         description: The penalty was successfully calculated
 *       404:
 *         description: The transaction was not found
 */

/**
 * @swagger
 * /api/transaction/return-book/v1:
 *   patch:
 *     summary: Return a book
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The transaction id
 *             example:
 *               id: 1
 *     responses:
 *       200:
 *         description: The book was successfully returned
 *       404:
 *         description: The transaction was not found
 */

/**
 * @swagger
 * /api/transaction/search/v1:
 *   post:
 *     summary: Search for a book or author
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
 *                 description: The search query
 *             example:
 *               query: "John Doe"
 *     responses:
 *       200:
 *         description: The search results
 *       404:
 *         description: No results found
 */

/**
 * @swagger
 * /api/transaction/extratime/v1:
 *   patch:
 *     summary: Extend the return time for a transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The transaction id
 *               extraDays:
 *                 type: integer
 *                 description: Number of extra days
 *             example:
 *               id: 1
 *               extraDays: 7
 *     responses:
 *       200:
 *         description: The extra time was successfully added
 *       404:
 *         description: The transaction was not found
 */

/**
 * @swagger
 * /api/transaction/upload/v1/{id}:
 *   patch:
 *     summary: Upload an image for a transaction
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The transaction id
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
 *         description: The image was successfully uploaded
 *       404:
 *         description: The transaction was not found
 */

router.post("/", transactionController.createTransaction);
router.get("/:id", transactionController.getDataTransaction);
router.patch("/penalty", transactionController.getPenalty);
router.patch("/return-book", transactionController.bookReturner);
router.get("/search", transactionController.searchBookOrAuthor);
router.patch("/extratime", transactionController.extraTimeController);
router.patch(
  "/upload/:id",
  uploader("IMG", "/images").single("file"),
  transactionController.uploadImage
);

module.exports = router;

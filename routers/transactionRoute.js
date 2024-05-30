const transactionController = require("../controllers/transactionController");
const router = require("express").Router();

router.post("/", transactionController.createTransaction);
router.get("/:id", transactionController.getDataTransaction);
router.patch("/penalty", transactionController.getPenalty);
router.patch("/return-book", transactionController.bookReturner);
module.exports = router;

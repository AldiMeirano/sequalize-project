const transactionController = require("../controllers/transactionController");
const router = require("express").Router();

router.post("/", transactionController.createTransaction);
router.get("/:id", transactionController.getDataTransaction);
module.exports = router;

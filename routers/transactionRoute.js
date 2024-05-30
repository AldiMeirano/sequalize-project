const transactionController = require("../controllers/transactionController");
const router = require("express").Router();

router.post("/", transactionController.createTransaction);

module.exports = router;

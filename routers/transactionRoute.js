const transactionController = require("../controllers/transactionController");
const uploader = require("../middleware/uploader");
const router = require("express").Router();

router.post("/", transactionController.createTransaction);
router.get("/:id", transactionController.getDataTransaction);
router.patch("/penalty", transactionController.getPenalty);
router.patch("/return-book", transactionController.bookReturner);
router.post("/search", transactionController.searchBookOrAuthor);
router.patch("/extratime", transactionController.extraTimeController);
router.patch(
  "/upload/:id",
  uploader("IMG", "/images").single("file"),
  transactionController.uploadImage
);
module.exports = router;

const bookController = require("../controllers/bookController");
const router = require("express").Router();

router.post("/add-book", bookController.addNewBook);
router.get("/:id", bookController.getOneBook);
router.patch("/:id", bookController.updateDataBook);
router.delete("/:id", bookController.deleteDataBook);

module.exports = router;

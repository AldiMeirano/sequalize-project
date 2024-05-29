const userController = require("../controllers/userController");
const verifyToken = require("../middleware/jwt");
const uploader = require("../middleware/uploader");

const router = require("express").Router();

router.post("/register", userController.registerAccount);
router.post("/login", userController.loginAccount);
router.post("/verified", userController.verifiedCode);
router.post("/forgot-password", userController.forgotPassword);
router.patch("/reset-password", verifyToken, userController.resetPassword);
router.patch("/reset-password", verifyToken, userController.resetPassword);
router.patch(
  "/photo-profile",
  verifyToken,
  uploader("IMG", "/profile").single("file"),
  userController.uploadPicture
);
module.exports = router;

const userController  = require('../controllers/userController')

const router = require('express').Router()

router.post('/register', userController.registerAccount)
router.post("/login", userController.loginAccount);
router.post("/verified", userController.verifiedCode);
router.post("/forgot-password", userController.forgotPassword);

module.exports = router;
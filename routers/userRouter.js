const userController  = require('../controllers/userController')

const router = require('express').Router()

router.post('/register', userController.registerAccount)
router.post("/login", userController.loginAccount);


module.exports = router;
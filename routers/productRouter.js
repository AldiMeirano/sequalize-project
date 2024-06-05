const productController = require('../controllers/productController');

const router = require('express').Router()

router.post('/addProduct', productController.addProduct)
router.get('/allProducts', productController.getAllProducts)
router.get('/published', productController.getPublishedProduct)
router.delete('/:id', productController.deleteProduct)
router.put('/:id', productController.updateProduct)
router.get('/:id', productController.getOneProduct)


module.exports = router;



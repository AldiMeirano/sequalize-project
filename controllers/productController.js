const db = require('../models')

const Product = db.products

const addProduct = async (req, res) => {
try {
    let info = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    const product = await Product.create(info)
    res.status(200).send(product)
    console.log(product)

} catch (error) {
    throw error
}
   

}


// 2. get all products
const getAllProducts = async (req, res) => {

    let products = await Product.findAll({})
    res.status(200).send(products)

}

// 3. get single product

const getOneProduct = async (req, res) => {

    let id = req.params.id
    let product = await Product.findOne({ where: { id: id }})
    res.status(200).send(product)

}

// 4. update Product

const updateProduct = async (req, res) => {
    try {
        let id = req.params.id

        await Product.update(req.body, { where: { id: id }})
     const data=   await Product.findOne({ where: { id: id }})
         res.status(200).send({ 
            status: true,
             message:'Update success',
            data
         })
    } catch (error) {
        throw error
    }

   
   

}

// 5. delete product by id

const deleteProduct = async (req, res) => {
    try {
        
    } catch (error) {
        
    }

    let id = req.params.id
    
    await Product.destroy({ where: { id: id }} )

    res.status(200).send('Product is deleted !')

}

// 6. get published product

const getPublishedProduct = async (req, res) => {

    const products =  await Product.findAll({ where: { published: true }})

    res.status(200).send(products)

}


module.exports = { 
    addProduct, 
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    getPublishedProduct
}
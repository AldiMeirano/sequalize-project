const createProductRepo = require("../../repositories/products/createProductRepo");

const addProductAction = async (title, price, description, published) => { 
    try {
        const data = await createProductRepo(title, price, description, published)
        return{ 
            status: 200, 
            message: 'Succes create product',
            data
        }
       
    } catch (error) {
        throw error 
    }
}

module.exports = addProductAction;
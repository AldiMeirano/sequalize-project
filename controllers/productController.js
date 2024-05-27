const response = require("../helper/response");
const db = require("../models");

const Product = db.products;

const addProduct = async (req, res) => {
  try {
    let info = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      published: req.body.published ? req.body.published : false,
    };

    const product = await Product.create(info);
    res.send(response(200, product, "Success created product"));
    console.log(product);
  } catch (error) {
    throw error;
  }
};

// 2. get all products
const getAllProducts = async (req, res) => {
  let products = await Product.findAll({});
  res.send(response(200, products, "Success get all products"));
};

// 3. get single product

const getOneProduct = async (req, res) => {
  let id = req.params.id;
  let product = await Product.findOne({ where: { id: id } });
  res.send(response(200, product, "Success get"));
};

// 4. update Product

const updateProduct = async (req, res) => {
  try {
    let id = req.params.id;

    await Product.update(req.body, { where: { id: id } });
    const data = await Product.findOne({ where: { id: id } });
    res.send(response(200, data, "Success update product"));
  } catch (error) {
    throw error;
  }
};

// 5. delete product by id

const deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let products = await Product.findAll({});
    await Product.destroy({ where: { id: id } });

    res.send(response(200, products, "Success delete product"));
  } catch (error) {
    throw error;
  }
};

// 6. get published product

const getPublishedProduct = async (req, res) => {
  const products = await Product.findAll({ where: { published: true } });

  res.send(response(200, products, "Success delete product"));
};

module.exports = {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getPublishedProduct,
};

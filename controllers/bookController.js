const response = require("../helper/response");
const db = require("../models");

const Book = db.book;
const addNewBook = async (req, res) => {
  try {
    let info = {
      title: req.body.title,
      author: req.body.author,
    };

    const product = await Book.create(info);
    res.send(response(200, product, "Success created new book"));
    console.log(product);
  } catch (error) {
    throw error;
  }
};

const getOneBook = async (req, res) => {
  let id = req.params.id;
  let product = await Book.findOne({ where: { id: id } });
  res.send(response(200, product, "Success get book"));
};

const updateDataBook = async (req, res) => {
  try {
    let id = req.params.id;

    await Book.update(req.body, { where: { id: id } });
    const data = await Book.findOne({ where: { id: id } });
    res.send(response(200, data, "Success update book"));
  } catch (error) {
    throw error;
  }
};

const deleteDataBook = async (req, res) => {
  try {
    let id = req.params.id;
    let products = await Book.findAll({});
    await Book.destroy({ where: { id: id } });
    res.send(response(200, products, "Success delete book"));
  } catch (error) {
    throw error;
  }
};
module.exports = {
  addNewBook,
  getOneBook,
  updateDataBook,
  deleteDataBook,
};







// module.exports = (sequelize, DataTypes) => {
//     const Transaction = sequelize.define("transaction", {
//       id: {
//         autoIncrement: true,
//         primaryKey: true,
//         type: DataTypes.INTEGER,
//       },
//       bookid: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       userId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       employeId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       checkIn: {
//         type: DataTypes.DATE,
//         allowNull: false,
//       },
//       checkOut: {
//         type: DataTypes.DATE,
//         allowNull: false,
//       },
//     });
//     return Transaction;
//   };
  
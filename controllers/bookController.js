const response = require("../helper/response");
const db = require("../models");

const Book = db.book;
const User = db.user;


const getAllDataBook = async (req, res) => {
  try {
    const dataUser = await Book.findAll();
    res.send(response(200, dataUser, "Success get all data"));
  } catch (error) {
    console.log(error);
  }
};
const addNewBook = async (req, res) => {
  try {
    const { user } = req;
    const dataUser = await User.findOne({ where: { email: user.email } });
    if (dataUser.role !== "admin") {
      res.status(400).send({
        status: false,
        message: "Cannot acces this feature",
      });
    }
    console.log("babi", user);
    let info = {
      title: req.body.title,
      author: req.body.author,
      quantity: req.body.quantity,
    };

    const product = await Book.create(info);
    return res.send(response(200, product, "Success created new book"));
  } catch (error) {
    throw error;
  }
};

const getOneBook = async (req, res) => {
  try {
    let id = req.params.id;
    let product = await Book.findOne({ where: { id: id } });
    res.send(response(200, product, "Success get book"));
  } catch (error) {
    console.log(error);
  }
};

const updateDataBook = async (req, res) => {
  try {
    const { user } = req;
    const dataUser = await User.findOne({ where: { email: user.email } });
    if (dataUser.role !== "admin") {
      res.status(400).send({
        status: false,
        message: "Cannot acces this feature",
      });
    }
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
    const { user } = req;
    const dataUser = await User.findOne({ where: { email: user.email } });
    if (dataUser.role !== "admin") {
      res.status(400).send({
        status: false,
        message: "Cannot acces this feature",
      });
    }
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
  getAllDataBook,
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
  
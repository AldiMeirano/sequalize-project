const response = require("../helper/response");
const db = require("../models");

const Book = db.book;
const User = db.user;
const addNewBook = async (req, res) => {
  try {
    let user = await User.findOne({
      where: { code_refferal: req.body.code_refferal },
    });
    if (user.code_refferal !== "NAMTHIP") {
      return res.send(response(404, null, "Youre not admin cannot"));
    }
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
    let user = await User.findOne({
      where: { code_refferal: req.body.code_refferal },
    });
    if (user.code_refferal !== "NAMTHIP") {
      return res.send(
        response(400, null, "Cannot access because youre not admin")
      );
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
    let user = await User.findOne({
      where: { code_refferal: req.body.code_refferal },
    });
    if (user.code_refferal !== "NAMTHIP") {
      return res.send(
        response(400, null, "Cannot access because youre not admin")
      );
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
  
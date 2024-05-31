const path = require("path");
const fs = require("fs");
const response = require("../helper/response");
const generateRandomId = require("../lib/randomnum");
const db = require("../models");
const Handlebars = require("handlebars");
const transporter = require("../lib/nodemailer");
const scheduler = require("node-schedule");
const { formatDate } = require("../lib/formattedDate");
const { Op } = require("sequelize");

const Transaction = db.transaction;
const Book = db.book;
const User = db.user;
const createTransaction = async (req, res) => {
  try {
    const checkBook = await Book.findOne({ where: { id: req.body.bookid } });
    if (checkBook.dataValues.status === "unavailable") {
      return res.status(400).send({
        message: "Sorry, the book has been borrowed",
      });
    }
    let info = {
      token: `SMB-${generateRandomId(6)}`,
      bookid: req.body.bookid,
      userId: req.body.userId,
      employeId: req.body.employeId,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
    };

    const product = await Transaction.create(info);
    let user = await User.findOne({ where: { id: req.body.userId } });
    const email = user.dataValues.email;
    const templatePath = path.join(
      __dirname,
      "../templates",
      "afterCheckout.hbs"
    );
    const updateBook = {
      status: "unavailable",
    };
    await Book.update(updateBook, { where: { id: req.body.bookid } });
    const templateSource = await fs.promises.readFile(templatePath, "utf8");
    const compileTemplate = Handlebars.compile(templateSource);
    const html = compileTemplate({
      name: user.name,
      checkIn: formatDate(product.checkIn),
      checkOut: formatDate(product.checkOut),
      token: product.token,
    });

    await transporter.sendMail({
      from: "sender",
      to: email,
      subject: "After borrow libary book",
      html,
    });

    const oneMinuteFromNow = new Date(Date.now() + 1 * 60 * 1000);
    scheduler.scheduleJob(oneMinuteFromNow, async () => {
      try {
        const bookData = await Book.findOne({ where: { id: id } });
        if (bookData.status == "unavailable") {
          const templatePath = path.join(
            __dirname,
            "../templates",
            "warningBook.hbs"
          );
          const templateSource = await fs.promises.readFile(
            templatePath,
            "utf8"
          );
          const compileTemplate = Handlebars.compile(templateSource);
          const html = compileTemplate({
            name: "asdsa",
          });

          await transporter.sendMail({
            from: "sender",
            to: email,
            subject: "After borrow libary book",
            html,
          });
          console.log("He doesnt");
        } else {
          scheduledTask.cancel();
          console.log("Cancel task");
        }

        await User.findOne({ where: { email: email } });
      } catch (error) {
        console.log(error);
        throw error;
      }
    });

    res.send(
      response(
        200,
        product,
        "Successfully borrow a book, please go to the receptionist for data collection"
      )
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getDataTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    const transaction = await db.transaction.findOne({
      where: { id: id },
      include: [
        { model: db.user, as: "user" },
        { model: db.employe, as: "employe" },
        { model: db.book, as: "book" },
      ],
    });

    res.send(response(200, transaction, "Successfully get data"));
  } catch (error) {
    console.log(error);
  }
};

const getPenalty = async (req, res) => {
  try {
    const token = await Transaction.findOne({
      where: { token: req.body.token },
    });

    if (!token) {
      res.status(400).send("Token is'nt correct");
    }

    const info = {
      penaltyId: req.body.penaltyId,
    };

    const transaction = await Transaction.update(info, {
      where: { token: req.body.token },
    });

    res.send(response(200, transaction, "Success send penalty to user"));
  } catch (error) {
    console.log(error);
  }
};

const bookReturner = async (req, res) => {
  try {
    const token = await Transaction.findOne({
      where: { token: req.body.token },
    });

    if (!token) {
      res.status(400).send("Token is'nt correct");
    }

    const info = {
      status: "available",
    };

    const transaction = await Book.update(info, {
      where: { id: token.bookid },
    });

    res.send(response(200, transaction, "Success return book"));
  } catch (error) {
    console.log(error);
  }
};

const searchBookOrAuthor = async (req, res) => {
  try {
    if (req.body.title) {
      const data = await Book.findOne({
        where: { title: req.body.title },
      });
      return res.send(response(200, data, "Success get data book"));
    } else {
      const data = await Book.findOne({
        where: { author: req.body.author },
      });
      return res.send(response(200, data, "Success get data by author"));
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createTransaction,
  getDataTransaction,
  getPenalty,
  bookReturner,
  searchBookOrAuthor,
};

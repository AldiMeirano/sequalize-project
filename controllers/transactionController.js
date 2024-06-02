const path = require("path");
const fs = require("fs");
const response = require("../helper/response");
const generateRandomId = require("../lib/randomnum");
const db = require("../models");
const Handlebars = require("handlebars");
const transporter = require("../lib/nodemailer");
const scheduler = require("node-schedule");
const { formatDate } = require("../lib/formattedDate");


const Transaction = db.transaction;
const Book = db.book;
const User = db.user;
const createTransaction = async (req, res) => {
  try {
    const dataUser = await User.findOne({ where: { id: req.body.userId } });
    const adminOrNot =
      req.body.role == "admin" ? "NAMTHIP" : `SMB-${generateRandomId(6)}`;
    if (dataUser.role === "admin") {
      return res.send(response(400, null, "As admin cannot checkout the book"));
    }
    const checkBook = await Book.findOne({ where: { id: req.body.bookid } });

    // if (checkBook.status === "unavailable") {
    //   return res.status(400).send({
    //     message: "Sorry, the book has been borrowed",
    //   });
    // }

    let info = {
      token: adminOrNot,
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
    const decrement = req.body.cart - checkBook.quantity;
    const updateBook = {
      status: "unavailable",
      quantity: decrement,
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
        { model: db.penalty, as: "penalty" },
      ],
    });

    if (transaction) {
      const checkinDate = new Date(transaction.checkOut);
      const checkoutDate = new Date(transaction.checkIn);
      const duration = Math.ceil(
        (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24)
      );
      transaction.setDataValue("duration", duration);
    }
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
    const info1 = {
      status: "done",
    };
    await Transaction.update(info1, {
      where: { token: req.body.token },
    });
    const info = {
      status: "available",
      quantity: token.cart,
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
      const data = await Book.findAll({
        where: { title: req.body.title },
      });
      return res.send(response(200, data, "Success get data book"));
    } else {
      const data = await Book.findAll({
        where: { author: req.body.author },
      });
      return res.send(response(200, data, "Success get data by author"));
    }
  } catch (error) {
    console.log(error);
  }
};

const extraTimeController = async (req, res) => {
  try {
    const data = await Transaction.findOne({
      where: { token: req.body.token },
    });

    if (!data) {
      return res.send(response(404, null, "Not found"));
    }
    const info = {
      checkOut: req.body.checkOut,
    };
    const transaction = await Transaction.update(info, {
      where: { token: req.body.token },
    });

    return res.send(response(200, transaction, "Success extratime"));
  } catch (error) {
    console.log(error);
  }
};

const uploadImage = async (req, res) => {
  try {
    const { file, params } = req;
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid room ID" });
    }
    const info = {
      image: `/${file?.filename}`,
    };

    const data = await Book.update(info, {
      where: { id: id },
    });
    return res.send(response(200, data, "Success upload picture book"));
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
  extraTimeController,
  uploadImage,
};
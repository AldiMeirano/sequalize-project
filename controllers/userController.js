const excludeFields = require("../helper/excludeFields");
const createToken = require("../helper/jwt");
const response = require("../helper/response");
const { hashPassword, comparePasswords } = require("../lib/bcrypt");
const generateRandomId = require("../lib/randomnum");
const db = require("../models");

// const scheduler = require("node-schedule");

const User = db.user;

const registerAccount = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ where: { email: email } });
    if (user) throw new Error("Already register");
    const hashedPassword = await hashPassword(password);
    req.body.password = hashedPassword;
    let info = {
      name: req.body.name,
      code_refferal: `SEQ-${generateRandomId(4)}`,

      email: req.body.email,
      password: req.body.password,
    };
    const product = await User.create(info);
    res.send(
      response(
        200,
        product,
        "Success Register check your email for verified you account"
      )
    );
    console.log(product);
  } catch (error) {
    throw error;
  }
};

const loginAccount = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ where: { email: email } });
    if (!user) throw new Error("Account not found!");

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) throw new Error("Invalid Password");

    const dataWithoutPassword = excludeFields(user, ["password"]);

    const token = createToken({ email: user.email });
    res.status(200).send({
      status: true,
      message: "Login success",
      dataWithoutPassword,
      token,
    });
  } catch (error) {
    throw error;
  }
};
module.exports = { registerAccount, loginAccount };

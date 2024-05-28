const path = require("path");
const fs = require("fs");
const excludeFields = require("../helper/excludeFields");
const createToken = require("../helper/jwt");
const response = require("../helper/response");
const { hashPassword, comparePasswords } = require("../lib/bcrypt");
const generateRandomId = require("../lib/randomnum");
const db = require("../models");
const Handlebars = require("handlebars");
const transporter = require("../lib/nodemailer");
const scheduler = require("node-schedule");
const { log } = require("console");
const { where } = require("sequelize");
const { updateProduct } = require("./productController");

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

    const templatePath = path.join(
      __dirname,
      "../templates",
      "templateEmail.hbs"
    );
    const templateSource = await fs.promises.readFile(templatePath, "utf8");
    const compileTemplate = Handlebars.compile(templateSource);
    const html = compileTemplate({
      name: name,
    });

    await transporter.sendMail({
      from: "sender",
      to: email,
      subject: "Verification your email",
      html,
    });

    const oneMinuteFromNow = new Date(Date.now() + 1 * 60 * 1000);
    const scheduledTask = scheduler.scheduleJob(oneMinuteFromNow, async () => {
      try {
        const info = {
          status: "no_verified",
          code_refferal: `SEQ-${generateRandomId(4)}`,
        };
        let userData = await User.findOne({ where: { email: email } });
        if (userData?.status === "pending") {
          await User.update(info, { where: { id: userData.id } });
          console.log("Try again, your account hasn't been verified yet");
        }
        if (userData.status === "verified") {
          scheduledTask.cancel();
          console.log("Your account is verified");
        }
      } catch (error) {
        console.log(error);
      }
    });

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

const verifiedCode = async (req, res) => {
  try {
    let userData = await User.findOne({ where: { id: req.body.id } });
    if (userData.code_refferal !== req.body.code_refferal) {
      res.send(response(405, null, "Your otp its not correct"));
    }
    const info = {
      status: "verified",
      code_refferal: `SEQ-${generateRandomId(4)}`,
    };
    if (userData.code_refferal) {
      const data = await User.update(info, {
        where: { id: userData.id },
      });
      res.send(response(200, data, "Success verified code"));
    }
  } catch (error) {
    console.log(error);
  }
};

const forgotPassword = async (req, res) => {
  try {
    let user = await User.findOne({ where: { email: req.body.email } });
    if (!user) throw new Error("Account not found");
    const token = createToken({ email: user.email });
    const templatePath = path.join(
      __dirname,
      "../templates",
      "templateResetPassword.hbs"
    );
    const templateSource = await fs.promises.readFile(templatePath, "utf8");
    const compileTemplate = Handlebars.compile(templateSource);
    const html = compileTemplate({ name: user.name });

    await transporter.sendMail({
      from: "sender",
      to: user.email,
      subject: "Reset password link",
      html,
    });
    res.send(response(200, token, "Please check your email for verification"));
  } catch (error) {
    console.log(error);
  }
};

const resetPassword = async (req, res) => {
  const { password, confirmPassword, email } = req.body;
  if (password !== confirmPassword) throw new Error("Password not match");
  let user = await User.findOne({ where: { email: email } });
  if (!user) throw new Error("Account not found");

  const hashedPassword = await hashPassword(password);
  const info = {
    password: hashedPassword,
  };
  await User.update(info, { where: { email: email } });
  res.send(response(200, user, "Reset password success"));
};
module.exports = {
  resetPassword,
  registerAccount,
  loginAccount,
  verifiedCode,
  forgotPassword,
};

const db = require("../models");

const User = db.user;

const registerAccount = async (req, res) => {
  try {
    let info = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    const product = await User.create(info);
    res.status(200).send(product);
    console.log(product);
  } catch (error) {
    throw error;
  }
};

module.exports = { registerAccount };

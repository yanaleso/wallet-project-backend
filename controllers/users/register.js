const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");

const { createError } = require("../../helpers");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "email in use");
  }
  const hash = await bcrypt.hash(password, 10);

  const result = await User.create({
    email,
    password: hash,
  });

  res.status(201).json(result.email);
};

module.exports = register;

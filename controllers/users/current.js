const { User } = require("../../models/user");
const { createError } = require("../../helpers/createError");

const current = async (req, res, next) => {
  const { _id  } = req.user;
  const user = await User.findById(_id);
  
  if (!user) {
    throw createError(401, "Token is required");
  }

  res.status(200).json({
    email: user.email,
    firstName: user.firstName,
    balance: user.balance
  });
};

module.exports = current;

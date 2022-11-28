const { User } = require("../../models/user");
const { createError } = require("../../helpers/createError");

const logOut = async (req, res, next) => {
  try {
    const { userId } = req;

    if (!userId) {
    throw createError(401, "Token is required");
  }
    
    await User.findByIdAndUpdate(userId, { token: "" });

    res.status(201).json({ message: "logged out" });
  } catch (error) {
    next(error);
  }
};

module.exports = logOut;

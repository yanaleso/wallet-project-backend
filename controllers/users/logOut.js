const { User } = require("../../models/user");

const logOut = async (req, res, next) => {
  try {
    const { userId} = req.userId;
    await User.findByIdAndUpdate(userId, { token: "" });

    res.status(201).json({ message: "logged out" });
  } catch (error) {
    next(error);
  }
};

module.exports = logOut;

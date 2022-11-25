const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
		balance: 0,
	});

	const payload = {
		id: result._id,
	};
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "14d" });

	await User.findByIdAndUpdate(result._id, { token });

	res.status(201).json({
		email: result.email,
		token,
	});
};

module.exports = register;

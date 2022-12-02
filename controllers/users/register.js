const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { createError } = require("../../helpers");
const { SECRET_KEY } = process.env;


const register = async (req, res, next) => {
	const { email, password,firstName } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		throw createError(409, "email in use");
	}
	const hash = await bcrypt.hash(password, 10);

	const result = await User.create({
		email,
		password: hash,
		firstName,
		balance: 0,
	});

	const payload = {
		id: result._id,
	};
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "14d" });

	await User.findByIdAndUpdate(result._id, { token });

	res.status(201).json({
		user:{
			email: result.email,
			firstName,
			balance: result.balance
		},
		token,
	});
};

module.exports = register;

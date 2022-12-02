const { Transaction, addSchema } = require("../../models/transaction");
const { User } = require("../../models/user");
const { RequestError } = require("../../utils");

const add = async (req, res, next) => {
	try {
		const { error } = addSchema.validate(req.body);
		if (error) throw new Error(error);
		const _id = req.userId;
		const timestamps = Number(new Date(req.body.date).getTime());
		const { typeOperation, amount } = req.body;

		if (typeOperation === "income") {
			req.body.category = "Regular Income";
		}
		const sum = typeOperation === "income" ? amount : -amount;
		const user = await User.findById(_id);
		if (!user) throw RequestError(404);
		if (user.balance === undefined) user.balance = 0;
		const balance = user.balance + sum;
		const newUser = { ...user._doc, balance };

		await User.findByIdAndUpdate(_id, newUser, {
			new: true,
		});

		const transaction = await Transaction.create({
			...req.body,
			owner: req.userId,
			timestamps,
			balanceAfterTransaction: balance,
		});
		res.status(201).json(transaction);
	} catch (error) {
		next(error);
	}
};

module.exports = add;

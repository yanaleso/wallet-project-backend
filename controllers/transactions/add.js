const { Transaction, addSchema } = require("../../models/transaction");

const add = async (req, res, next) => {
	try {
		const { error } = addSchema.validate(req.body);
		if (error) throw new Error(error);
		const transaction = await Transaction.create({
			...req.body,
			owner: req.userId,
		});
		res.status(201).json(transaction);
	} catch (error) {
		next(error);
	}
};

module.exports = add;

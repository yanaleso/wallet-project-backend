const { Transaction } = require("../../models/transaction");

const getAllTransactions = async (req, res, next) => {
	try {
		const id = req.userId;

		const transactions = await Transaction.find({
			owner: id,
		});
		res.json(transactions);
	} catch (error) {
		next(error);
	}
};

module.exports = getAllTransactions;

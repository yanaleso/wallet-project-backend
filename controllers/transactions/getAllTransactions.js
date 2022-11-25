const { Transaction } = require("../../models/transaction");

const getAllTransactions = async (req, res, next) => {
	try {
		const id = req.userId;
		const { page = 1, limit = 5 } = req.query;
		const skip = (page - 1) * limit;
		const transactions = await Transaction.find(
			{
				owner: id,
			},
			"-createdAt -updatedAt",
			{
				skip,
				limit,
			}
		);
		res.json(transactions);
	} catch (error) {
		next(error);
	}
};

module.exports = getAllTransactions;

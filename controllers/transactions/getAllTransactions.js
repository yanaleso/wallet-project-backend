const { Transaction } = require("../../models/transaction");
const { User } = require("../../models/user");

const getAllTransactions = async (req, res, next) => {
	try {
		const id = req.userId;
		const { page = 1, limit = 5 } = req.query;
		const skip = (page - 1) * limit;
		const transactions = await Transaction.find(
			{
				owner: id,
			},
			"-updatedAt"
		)
			.sort({ timestamps: -1, createdAt: -1 })
			.skip(skip)
			.limit(limit);
		const user = await User.findById(id);
		const userBalance = user ? user.balance : null;

		res.json({ transactions, userBalance });
	} catch (error) {
		next(error);
	}
};

module.exports = getAllTransactions;

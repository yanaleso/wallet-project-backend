const { Transaction } = require("../../models/transaction");
const { ObjectId } = require("mongoose").Types;

const getStatistics = async (req, res, next) => {
	const fullYear = false;
	try {
		const _id = req.userId;
		let { month = null, year = null } = req.query;
		if (!month && year) {
			month = 0;
			fullYear = true;
		}
		if (month && !year) year = "2022";
		const timestamps =
			(month === null) & (year === null)
				? 0
				: new Date(year, month, 1, 2).getTime();
		console.log("timestamps", timestamps);

		const statistics = await Transaction.aggregate()
			.match({
				owner: ObjectId(_id),
				timestamps: { $gte: timestamps },
			})
			.group({
				_id: "$category",
				totalSum: { $sum: "$amount" },
				type: { $first: "$typeOperation" },
			});
		res.json(statistics);
	} catch (error) {
		next(error);
	}
};

module.exports = getStatistics;

const { Transaction } = require("../../models/transaction");
const getMinAndMaxTimestamps = require("../../utils/getMinAndMaxTimestamps");
const { ObjectId } = require("mongoose").Types;

const getStatistics = async (req, res, next) => {
	let fullYear = false;
	try {
		const _id = req.userId;
		let { month = null, year = null } = req.query;
		if (!month && year) {
			fullYear = true;
		}
		if (month && !year) year = "2022";
		const { minTimestamps, maxTimestamps } = getMinAndMaxTimestamps({
			month,
			year,
		});

		const statistics = await Transaction.aggregate()
			.match({
				owner: ObjectId(_id),
				timestamps: { $gte: minTimestamps, $lte: maxTimestamps },
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

const { Transaction } = require("../../models/transaction");
const { ObjectId } = require("mongoose").Types;

const getStatistics = async (req, res, next) => {
	try {
		const _id = req.userId;
		const { month = null, year = null } = req.query;
		if (month && !year) year = "2022";
		const timestamps = new Date(`${year}/${month}/01`);
		console.log("timestamps:", timestamps);

		const statistics = await Transaction.aggregate().match({
			owner: ObjectId(_id),
			// year: { $lt: "2022" },
		});
		res.json(statistics);
	} catch (error) {
		next(error);
	}
};

module.exports = getStatistics;

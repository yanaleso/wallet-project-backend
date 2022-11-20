const { Transaction } = require("../../models/transaction");
const { ObjectId } = require("mongoose").Types;

const getStatistics = async (req, res, next) => {
	try {
		const _id = req.userId;
		const objID = `ObjectId('${_id}')`;
		const { month = null, year = null } = req.query;
		console.log("id:", ObjectId(_id));

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

const getCurentLocaleDate = require("./getCurentLocaleDate");

const getMinAndMaxTimestamps = ({ month, year }) => {
	if (!month && year) {
		return {
			minTimestamps: new Date(year, 0, 1, 2).getTime(),
			maxTimestamps: new Date(Number(year) + 1, 0, 1, 1, 59, 59, 999).getTime(),
		};
	}
	if (!month && !year) {
		return {
			minTimestamps: 0,
			maxTimestamps: getCurentLocaleDate(new Date()).getTime(),
		};
	}

	return {
		minTimestamps: new Date(year, month, 1, 2).getTime(),
		maxTimestamps: new Date(
			year,
			Number(month) + 1,
			1,
			1,
			59,
			59,
			999
		).getTime(),
	};
};

module.exports = getMinAndMaxTimestamps;

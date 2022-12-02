const getCurentLocaleDate = (date) => {
	const year = date.getFullYear();
	const month = date.getMonth();
	const dateOfMonth = date.getDate();
	const hour = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	const ms = date.getMilliseconds();

	return new Date(
		year,
		month,
		dateOfMonth,
		Number(hour + 2),
		minutes,
		seconds,
		ms
	);
};

module.exports = getCurentLocaleDate;

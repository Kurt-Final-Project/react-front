const formatDateFromNow = (date) => {
	const now = new Date();
	const givenDate = new Date(date);

	const timeDifference = now - givenDate;
	const seconds = Math.floor(timeDifference / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	let formattedTime = "";

	if (days >= 1) {
		const formattedDate = givenDate.toLocaleDateString("en-US");
		formattedTime = `${formattedDate}`;
	} else if (hours >= 1) {
		formattedTime = `${hours} hours ago`;
	} else if (minutes >= 1) {
		formattedTime = `${minutes} minutes ago`;
	} else formattedTime = `${seconds} seconds ago`;

	return formattedTime;
};

export default formatDateFromNow;

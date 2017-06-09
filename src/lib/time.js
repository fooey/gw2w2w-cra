

export function getRefreshInterval(ageInSeconds) {
	let interval;

	if (ageInSeconds < 75) {
		interval = 1 * 1000;
	} else if (ageInSeconds < 120 * 10) {
		interval = 10 * 1000;
	} else {
		interval = 60 * 1000;
	}

	return interval;
}

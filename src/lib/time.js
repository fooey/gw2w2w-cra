
import _ from 'lodash';
import moment from 'moment-twitter';


const MS_S = 1000;
const MS_N = 60 * MS_S;
const MS_H  = 60 * MS_N;
// const MS_D = 60 * MS_H ;

const S = 1;
const N = 60 * S;
const H = 60 * N;
// const D = 24 * H;

/*
* 	Return a longer invterval the further way from the milestone
*/
export function getRefreshInterval(secondsFromMilestone) {
	const absSeconds = Math.abs(_.parseInt(secondsFromMilestone));

	let interval;

	if (absSeconds < N * 1.5) {
		interval = MS_S * 1;
	} else if (absSeconds < N * 5) {
		interval = MS_S * 15;
	} else if (absSeconds < H * 1.5) {
		interval = MS_N * 1;
	} else if (absSeconds < H * 2) {
		interval = MS_N * 15;
	} else {
		interval = MS_H * 1;
	}

	// adjust the result so that it will align with the interval break points
	if (interval > MS_S) {
		const offsetFromInterval = absSeconds % (interval / 1000);
		interval = interval - offsetFromInterval;
	}

	return interval;
}



export const getNow = () => moment().unix();
export const getAboutNow = _.throttle(getNow, 1000);

import _ from 'lodash';

import STATIC from 'src/data/static';

export function getObjective(id) {
	return _.get(STATIC.objectivesById, id);
}

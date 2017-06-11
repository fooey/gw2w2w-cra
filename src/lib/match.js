import _ from 'lodash';

export function getTeamColor(allWorlds, worldId) {
	if (_.includes(_.get(allWorlds, 'red_ids', []), worldId)) {
		return 'red';
	} else if (_.includes(_.get(allWorlds, 'green_ids', []), worldId)) {
		return 'green';
	} else if (_.includes(_.get(allWorlds, 'blue_ids', []), worldId)) {
		return 'blue';
	} else{
		return 'none';
	}
}

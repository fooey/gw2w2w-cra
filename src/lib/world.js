import _ from 'lodash';

import STATIC from 'src/data/static';

export function getWorld(id) {
	return _.get(STATIC.worldsById, id);
}

export function getWorldBySlug(worldSlug) {
	const worldId = _.get(STATIC.worldSlugMap, worldSlug);
	return getWorld(worldId);
	// return _.find(STATIC.worlds, world => _.includes(world.slugs, worldSlug));
}

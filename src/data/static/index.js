import _ from 'lodash';

import worlds from './worlds.json';
import langs from './langs.json';
import objectives from './objectives.json';

const langsBySlug = _.keyBy(langs, 'slug');
const objectivesById = _.keyBy(objectives, 'id');

const worldsById = _.keyBy(worlds, 'id');
const worldSlugMap = generateWorldSlugsMap(worlds);

export default {
	colors: ['red', 'blue', 'green'],
	regions: ['NA', 'EU'],
	langs,
	langsBySlug,
	objectives,
	objectivesById,
	worlds,
	worldsById,
	worldSlugMap,
};


function generateWorldSlugsMap(worlds) {
	return _.reduce(worlds, (acc, world) => {
		const worldMap = _.reduce(world.slugs, (acc, slug) => {
			return _.merge(acc, { [slug]: world.id });
		}, {});
		
		return _.merge(acc, worldMap);
	}, {});
}

import _ from 'lodash';

import STATIC from 'src/data/static';

export function getLangBySlug(langSlug) {
	return _.get(STATIC.langsBySlug, langSlug);
}

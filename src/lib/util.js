import _ from 'lodash';


export function didAnyPropUpdate(props, nextProps, propPaths) {
	if (_.isEmpty(props) || _.isEmpty(nextProps)) {
		return true;
	}

	return propPaths.reduce((result, propPath) => {
		return result || didPropUpdate(props, nextProps, propPath);
	}, false);
}

export function didPropUpdate(props, nextProps, propPath) {
	return !isPropEqual(props, nextProps, propPath);
}

export function isPropEqual(props, nextProps, propPath) {
	return _.isEqual(
		_.get(props, propPath),
		_.get(nextProps, propPath)
	);
}

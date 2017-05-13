import React, {PureComponent} from 'react';
import {graphql} from 'react-apollo';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import classnames from 'classnames';

import WorldQuery from 'src/gql/world';

class MatchWorld extends PureComponent {
	render() {
		const {data, color, currentLang} = this.props;
		const {loading, world} = data;

		const className = classnames({
			"match-worlds-world": true,
			[`team-${color}`]: true,
		});

		if (loading) 
			return <div>Loading</div>;
		
		const worldName = _.get(world, [
			currentLang.slug, 'name',
		], 'ERR');
		const worldSlug = _.get(world, [
			currentLang.slug, 'slug',
		], 'ERR');
		const worldLink = ['', currentLang.slug, worldSlug].join('/');

		return (
			<div className={className}>
				<Link to={worldLink}>{worldName}</Link>
			</div>
		);
	}
}

export default graphql(WorldQuery, {
	options: {
		shouldBatch: true,
	},
})(MatchWorld);

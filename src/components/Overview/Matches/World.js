import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import classnames from 'classnames';

class MatchWorld extends PureComponent {
	render() {
		const { GLOBALS, color, world } = this.props;

		const className = classnames({
			"match-worlds-world": true,
			[`team-${color}`]: true,
		});
		
		const worldName = _.get(world, [
			GLOBALS.lang.slug, 'name',
		], 'ERR');
		const worldSlug = _.get(world, [
			GLOBALS.lang.slug, 'slug',
		], 'ERR');
		const worldLink = ['', GLOBALS.lang.slug, worldSlug].join('/');

		return (
			<div>
				<Link to={worldLink} className={className}>{worldName}</Link>
			</div>
		);
	}
}

export default MatchWorld;

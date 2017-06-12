import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import classnames from 'classnames';
import numeral from 'numeral';

import { getWorldBySlug, getWorld, getWorldLink } from 'src/lib/world';
// import { getTeamColor } from 'src/lib/match';


class Scoreboards extends Component {
	render() {
		const { match, langSlug, worldSlug } = this.props;

		const matchWorld = getWorldBySlug(worldSlug);
		// const teamColor = getTeamColor(match.all_worlds, world.id);

		return (
			<div className="match-scoreboards">
				{_.map(['red', 'blue', 'green'], color => {
					const worldId = _.get(match.worlds, `${color}_id`);
					const world = getWorld(worldId);
					const allWorldIds = _.without(_.get(match.all_worlds, `${color}_ids`), worldId);
					const score = _.get(match, ['scores', color]);

					const classes = classnames({
						"match-scoreboard": true,
						active: world.id === matchWorld.id,
						[`team-${color}`]: true,
						// [`team-${color}-bg`]: true,
					});

					return (
						<div key={color} className={classes}>
							<h2 className={``}>
								<Link to={getWorldLink(world, langSlug)} className={`team-${color}`}>
									{_.get(world, [langSlug, 'name'])}
								</Link>
							</h2>

							<h3 key={worldId} className={``}>
								{_.map(allWorldIds, worldId => {
									const world = getWorld(worldId);

									return (
										<Link key={worldId} to={getWorldLink(world, langSlug)} className={`team-${color}`}>
											{_.get(world, [langSlug, 'name'])}
										</Link>
									);
								})}
							</h3>

							<div className='team-score'>
								{numeral(score).format('0,0')}
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}

export default Scoreboards;

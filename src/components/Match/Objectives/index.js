import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment-twitter';
// import classnames from 'classnames';
// import numeral from 'numeral';

import Card from 'src/components/Layout/Card';
import {
	Icon as ObjectiveIcon,
	Name as ObjectiveName,
	// Duration as ObjectiveDuration,
} from 'src/components/Util/objective.js';

import { getObjective } from 'src/lib/objective';
// import { getTeamColor } from 'src/lib/match';

const MAP_TYPES = [
	'Center',
	'RedHome',
	'BlueHome',
	'GreenHome',
];

const OBJECTIVE_TYPES = [
	'Castle',
	'Keep',
	'Tower',
	'Camp',
	// 'Ruins',
];

class Objectives extends Component {
	render() {
		const { objectives, langSlug } = this.props;
		// const teamColor = getTeamColor(match.all_worlds, world.id);

		const objectivesMeta = _.map(objectives, os => getObjective(os.id));

		const combinedObjectives = _.merge(
			{},
			_.keyBy(objectives, 'id'),
			_.keyBy(objectivesMeta, 'id'),
		);

		return (
			<div className="match-maps">{_.map(MAP_TYPES, mapType => {
				const mapObjectives = _.filter(combinedObjectives, { map_type: mapType });

				return (
					<MatchMap
						key={mapType}
						langSlug={langSlug}
						mapType={mapType}
						objectives={mapObjectives}
					/>
				);
			})}</div>
		);
	}
}


class MatchMap extends Component {
	render() {
		const { objectives, mapType, langSlug } = this.props;

		return (
			<Card className="match-map">
				{/* <h1>{mapType}</h1> */}
				<ul className="match-map-objectives list-unstyled">{
					_.map(OBJECTIVE_TYPES, type => {
						const typeObjectives = _.chain(objectives)
							.filter({ type })
							.sortBy([(o => _.get(o, [langSlug, 'name']))])
							.value();

						return (typeObjectives.length ?
							<li key={type} className={`objectives-type objectives-type-${type}`}>

								<ul className="objectives list-unstyled">{
									_.map(typeObjectives, objective => {
										const owner = _.get(objective, 'owner').toLowerCase();
										const claimedBy = _.get(objective, 'claimed_by');

										return (
											// <li key={objective.id}>{JSON.stringify(objective, null, '\t')}</li>
											<li key={objective.id} className={`objective team-${owner}`}>
												{/* <ObjectiveIcon type={type} color={owner} /> */}
												<div className='duration'>{moment(_.get(objective, 'last_flipped') * 1000).twitter()}</div>
												<ObjectiveIcon type={type} color={owner} />
												<ObjectiveName objective={objective} langSlug={langSlug} />
												<div className="guild">
													<div className='guild-icon'>{claimedBy ? <img src={`https://guilds.gw2w2w.com/${claimedBy}.svg`} alt={claimedBy} /> : null}</div>
												</div>
											</li>
										);
									})
								}</ul>

							</li>
						: null);
					})
				}</ul>
			</Card>
		);
	}
}



export default Objectives;

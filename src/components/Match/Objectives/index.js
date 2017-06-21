import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import _ from 'lodash';
// import classnames from 'classnames';
// import numeral from 'numeral';

import Card from 'src/components/Layout/Card';
import {
	Icon as ObjectiveIcon,
	Name as ObjectiveName,
	Duration as ObjectiveDuration,
} from 'src/components/Util/objective.js';

import { getObjective } from 'src/lib/objective';
// import { getTeamColor } from 'src/lib/match';

const MAP_TYPES = [
	'Center',
	'RedHome',
	'BlueHome',
	'GreenHome',
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
				<h1>{mapType}</h1>
				{/* <pre>objectives: </pre> */}
				<ul className="list-unstyled">{
					_.map(objectives, objective => {
						const owner = _.get(objective, 'owner').toLowerCase();
						const type = _.get(objective, 'type').toLowerCase();
						const claimedBy = _.get(objective, 'claimed_by');

						return (
							// <li key={objective.id}>{JSON.stringify(objective, null, '\t')}</li>
							<li key={objective.id} className={`team-${owner}`}>
								<ObjectiveIcon type={type} color={owner} />
								<div>{_.get(objective, [langSlug, 'name'])}</div>
								<div>{_.get(objective, 'id')}</div>
								<div>{_.get(objective, 'type')}</div>
								<div>{owner}</div>
								<div>{_.get(objective, 'last_flipped')}</div>
								<div>{_.get(objective, 'claimed_by')}</div>
								{claimedBy ? <div><img src={`https://guilds.gw2w2w.com/${claimedBy}.svg`} width="16" height="16" alt={claimedBy} /></div> : null}
								<div>{_.get(objective, 'points_tick')}</div>
								<div>{_.get(objective, 'points_capture')}</div>
							</li>
						);
					})
				}</ul>
			</Card>
		);
	}
}



export default Objectives;

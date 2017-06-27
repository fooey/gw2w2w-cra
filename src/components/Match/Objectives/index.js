import React, { Component, PureComponent } from 'react';
import { graphql } from 'react-apollo';
// import { Link } from 'react-router-dom';
import _ from 'lodash';
// import moment from 'moment-twitter';
// import classnames from 'classnames';
// import numeral from 'numeral';

import Card from 'src/components/Layout/Card';
import {
	Icon as ObjectiveIcon,
	Name as ObjectiveName,
	Cooldown as ObjectiveCooldown,
} from 'src/components/Util/objective.js';

import { getObjective } from 'src/lib/objective';
// import { getTeamColor } from 'src/lib/match';

import GuildQuery from 'src/gql/guild';

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
		const { objectives/*, mapType*/, langSlug } = this.props;

		return (
			<Card className="match-map">
				{/* <h1>{mapType}</h1> */}
				<ul className="match-map-objectives list-unstyled">{
					_.map(OBJECTIVE_TYPES, type => {
						const typeObjectives = _.chain(objectives)
							.filter({ type })
							.sortBy([(o => _.get(o, [langSlug, 'name']))])
							.value();

						return (typeObjectives.length
							? <li key={type} className={`objectives-type objectives-type-${type}`}>

								<ul className="objectives list-unstyled">{
									_.map(typeObjectives, objective => {
										return (
											<Objective
												key={objective.id}
												langSlug={langSlug}
												objective={objective}
												type={type}
											/>
										);
									})
								}</ul>

							</li>
							: null
						);
					})
				}</ul>
			</Card>
		);
	}
}


class Objective extends Component {
	render() {
		const { objective, langSlug, type } = this.props;
		const {
			owner,
			claimed_by: claimedBy,
			last_flipped: lastFlipped,
		} = objective;

		const team = owner.toLowerCase();

		return (
			// <li key={objective.id}>{JSON.stringify(objective, null, '\t')}</li>
			<li key={objective.id} className={`objective team-${team}`}>
				{/* <ObjectiveIcon type={type} color={team} /> */}
				{/* <div className='duration'>{moment(_.get(objective, 'last_flipped') * 1000).twitter()}</div> */}
				{/* <ObjectiveDuration lastFlipped={lastFlipped} /> */}
				<ObjectiveCooldown lastFlipped={lastFlipped} />
				<ObjectiveIcon type={type} color={team} />
				<ObjectiveName objective={objective} langSlug={langSlug} />
				{claimedBy ? <GuildWithData id={claimedBy} /> : null}
			</li>
		);
	}
}


class Guild extends Component {
	render() {
		const { id, data } = this.props;
		const { guild } = data;

		return (
			<a href={`#${id}`} className="guild">
				{guild ? <GuildText name={guild.name} tag={guild.tag} /> : null}
				<GuildIcon id={id} />
			</a>
		);
	}
}


class GuildText extends PureComponent {
	render() {
		const { name, tag } = this.props;

		return (
			<div className="guild-text">
				{/* <span className='guild-name'>{name}</span> */}
				<span className="guild-tag" title={name}>{tag}</span>
			</div>
		);
	}
}


class GuildIcon extends PureComponent {
	render() {
		const { id } = this.props;

		return (
			<div className='guild-icon'>
				<img src={`https://guilds.gw2w2w.com/${id}.svg`} alt={id} />
			</div>
		);
	}
}

const GuildWithData = graphql(GuildQuery, {
	options: ({ id }) => ({
		shouldBatch: true,
		variables: { id },
	}),
})(Guild);



export default Objectives;

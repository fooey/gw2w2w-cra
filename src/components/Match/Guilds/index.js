import React, { Component, PureComponent } from 'react';
// import moment from 'moment';
// import ReactInterval from 'react-interval';
// import moment from 'moment-twitter';
import { graphql } from 'react-apollo';
import _ from 'lodash';

// import { getRefreshInterval, getAboutNow } from 'src/lib/time';
import { getObjective } from 'src/lib/objective';

// import Matches from './Matches/index';
// import Worlds from './Worlds/index';

import {
	Icon as ObjectiveIcon,
	Name as ObjectiveName,
	Duration as ObjectiveDuration,
} from 'src/components/Util/objective.js';

import { Loading } from 'src/components/Util';

import GuildQuery from 'src/gql/guild';


function generateGuildsFromObjectives(objectives) {
	return _.chain(objectives)
		.filter(o => o.claimed_by)
		.groupBy('claimed_by')
		.map((objectives, guildId) => generateGuild(objectives, guildId))
		.sortBy('lastFlippedMax')
		.reverse()
		.keyBy('id')
		.value();
}


function generateGuild(objectives, guildId) {
	const color = objectives[0].owner.toLowerCase();

	const guildObjectives = _.chain(objectives)
		.map(o => ({
			id: o.id,
			lastFlipped: o.last_flipped,
		}))
		.sortBy(o => o.lastFlipped)
		.reverse()
		.value();

	const lastFlippedMin = _.minBy(guildObjectives, 'lastFlipped').lastFlipped;
	const lastFlippedMax = _.maxBy(guildObjectives, 'lastFlipped').lastFlipped;

	return {
		id: guildId,
		objectives: guildObjectives,
		color,
		lastFlippedMin,
		lastFlippedMax,
	};
}


class Guilds extends Component {
	render() {
		const { objectives, langSlug } = this.props;

		const guilds = generateGuildsFromObjectives(objectives);

		return (
			<div className="match-guilds container">
				<div className="row">
					<div className="col">
						<GuildsList langSlug={langSlug} guilds={guilds} />
					</div>
				</div>
			</div>
		);
	}
}


class GuildsList extends PureComponent {
	render() {
		const { guilds, langSlug } = this.props;
		// console.log('GuildsList');
		// console.log('guild', guilds);
		return (
			<table className="table"><tbody>
				{_.map(guilds, objectivesGuild =>
					<GuildWithData
						key={objectivesGuild.id}
						langSlug={langSlug}
						id={objectivesGuild.id}
						color={objectivesGuild.color}
						objectives={objectivesGuild.objectives}
					/>)}
			</tbody></table>
		);
	}
}

class Guild extends PureComponent {
	render() {
		const { data, id, color, objectives, langSlug } = this.props;
		const { guild } = data;

		return (
			<tr className={`row team-${color}`}>
				<td className="text-center" style={{width: 172}}>
					<img src={`https://guilds.gw2w2w.com/${id}.svg`} width="160" height="160" alt={id} />
				</td>
				<td className="" style={{verticalAlign: "center"}}>
					{guild ? (
						<h4>
							{guild.name}
							{' '}
							<small>[{guild.tag}]</small>
						</h4>
					) : <h4><Loading /></h4>}

					<GuildObjectives color={color} guildObjectives={objectives} langSlug={langSlug}/>
				</td>
			</tr>
		);
	}
}

class GuildObjectives extends PureComponent {
	render() {
		const { guildObjectives, color, langSlug } = this.props;

		return (
			<ul className="list-unstyled">
				{_.map(guildObjectives, guildObjective =>
					<GuildObjective key={guildObjective.id} langSlug={langSlug} guildObjective={guildObjective} color={color} />
				)}
			</ul>
		);
	}
}


class GuildObjective extends PureComponent {
	render() {
		const { guildObjective, color, langSlug } = this.props;

		const objective = getObjective(guildObjective.id);

		return (
			<li key={objective.id} className="guild-objective">
				<ObjectiveIcon type={objective.type} color={color} />
				<ObjectiveDuration lastFlipped={guildObjective.lastFlipped} />
				<div className="objective-map">{objective.map_type} {' - '}</div>
				<ObjectiveName objective={objective} langSlug={langSlug} />
			</li>
		);
	}
}


const GuildWithData = graphql(GuildQuery, {
	options: ({ id }) => ({
		shouldBatch: false,
		variables: { id },
	}),
})(Guild);

export default Guilds;

import React, { Component, PureComponent } from 'react';
// import moment from 'moment';
import ReactInterval from 'react-interval';
import moment from 'moment-twitter';
import { graphql } from 'react-apollo';
import _ from 'lodash';

import { getRefreshInterval, getAboutNow } from 'src/lib/time';
import { getObjective } from 'src/lib/objective';

// import Matches from './Matches/index';
// import Worlds from './Worlds/index';

import Castle from 'src/components/svg/castle.js';
import Keep from 'src/components/svg/keep.js';
import Tower from 'src/components/svg/tower.js';
import Camp from 'src/components/svg/camp.js';

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

class ObjectiveIcon extends PureComponent {
	render() {
		const { type, color, size="32" } = this.props;
		const typeKey = type.toLowerCase();

		const colorMap = {
			red: '#a94442',
			green: '#3c763d',
			blue: '#31708f',
		};
		const fillColor = colorMap[color];

		const TypeMap = {
			castle: Castle,
			keep: Keep,
			tower: Tower,
			camp: Camp,
		};
		const Objective = TypeMap[typeKey];

		const props = {
			width: size,
			height: size,
			fillColor,
		};

		return <Objective {...props} />;
	}
}


class GuildObjective extends Component {
	constructor() {
		super();

		this.state = {
			now: getAboutNow(),
		};
	}

	render() {
		const { guildObjective, color, langSlug } = this.props;
		const { now } = this.state;

		const objective = getObjective(guildObjective.id);
		const ageInSeconds = Math.floor(now - guildObjective.lastFlipped);
		const refreshInterval = getRefreshInterval(ageInSeconds);

		return (
			<li key={objective.id} className="guild-objective">
				<ReactInterval timeout={refreshInterval} enabled={true} callback={() => this.setState({ now: getAboutNow() })} />

				<span className="objective-icon"><ObjectiveIcon type={_.get(objective, ['type'])} color={color} /></span>
				<span className="objective-timer">{moment(guildObjective.lastFlipped * 1000).twitter()}</span>
				<span className="objective-timer">{ageInSeconds}</span>
				<span className="objective-timer">{refreshInterval}</span>
				<span className="objective-name">{_.get(objective, [langSlug, 'name'])}</span>
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

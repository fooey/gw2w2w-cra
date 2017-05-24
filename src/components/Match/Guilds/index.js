import React, { Component, PureComponent } from 'react';
// import moment from 'moment';
import ReactInterval from 'react-interval';
import moment from 'moment-twitter';
// import { graphql } from 'react-apollo';
import _ from 'lodash';

import { getRefreshInterval } from 'src/lib/time';

// import Matches from './Matches/index';
// import Worlds from './Worlds/index';

// import { Loading } from 'src/components/Util';

// import MatchQuery from 'src/gql/match';


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
	
	const lastFlippedMin = moment(_.minBy(guildObjectives, 'lastFlipped').lastFlipped);
	const lastFlippedMax = moment(_.maxBy(guildObjectives, 'lastFlipped').lastFlipped);
	
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
		const { objectives, GLOBALS } = this.props;

		const guilds = generateGuildsFromObjectives(objectives);

		return (
			<div className="overview container">
				<div className="row">
					<div className="col"> 						
						<GuildsList GLOBALS={GLOBALS} guilds={guilds} />
					</div>
				</div>
			</div>
		);
	}
}


class GuildsList extends PureComponent {
	render() {
		const { guilds, GLOBALS } = this.props;
		// console.log('GuildsList');
		// console.log('guild', guilds);
		return (
			<ul className="list-unstyled">
				{_.map(guilds, guild => <Guild key={guild.id} GLOBALS={GLOBALS} guild={guild} />)}
			</ul>
		);
	}
}

class Guild extends PureComponent {
	render() {
		const { guild, GLOBALS } = this.props;
		
		return (
			<div className={`row team-${guild.color}`}>
				<div className="col-sm-auto" style={{width: 128}}>
					<img src={`https://guilds.gw2w2w.com/${guild.id}.svg`} width="128" height="128" alt={guild.id} /> 						
				</div>
				<div className="col align-self-center">
					<h1>
						{guild.id.split('-')[0]}
						{' '}
						<small>[{guild.id.split('-')[1]}]</small>
					</h1>
					<h5>
						{guild.id}
					</h5>
					
					<GuildObjectives guildObjectives={guild.objectives} GLOBALS={GLOBALS}/>
				</div>
			</div>
		);
	}
}


const GuildObjectives = ({ guildObjectives, GLOBALS }) => {	
	return (
		<ul className="list-unstyled">
			{_.map(guildObjectives, guildObjective =>
				<GuildObjective key={guildObjective.id} GLOBALS={GLOBALS} guildObjective={guildObjective} />
			)}
		</ul>
	);
};


class GuildObjective extends Component {
	constructor() {
		super();
		
		this.state = {
			now: moment(),
		};
	} 
	
	render() {
		const { guildObjective, GLOBALS } = this.props;
		const { now } = this.state;
		
		const objective = _.find(GLOBALS.objectives, { id: guildObjective.id });
		const ageInSeconds = now.diff(guildObjective.lastFlipped, 'seconds');		
		const refreshInterval = getRefreshInterval(ageInSeconds);
		
		return (
			<li key={objective.id}>
				<ReactInterval timeout={refreshInterval} enabled={true} callback={() => this.setState({ now: moment() })} />
				
				{moment(guildObjective.lastFlipped).twitter()}
				{' '}
				{_.get(objective, [GLOBALS.lang.slug, 'name'])}
			</li>
		);
	}
}


// const MatchWithData = graphql(MatchQuery, {
// 	options: ({ GLOBALS }) => ({
// 		shouldBatch: true,
// 		pollInterval: 1000 * 8,
// 		variables: {
// 			worldId: GLOBALS.world.id,
// 		},
// 	}),
// })(Match);

export default Guilds;

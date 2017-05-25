import React, { Component, PureComponent } from 'react';
// import moment from 'moment';
import ReactInterval from 'react-interval';
import moment from 'moment-twitter';
import { graphql } from 'react-apollo';
import _ from 'lodash';

import { getRefreshInterval } from 'src/lib/time';

// import Matches from './Matches/index';
// import Worlds from './Worlds/index';

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
			<table className="table"><tbody>
				{_.map(guilds, objectivesGuild => 
					<GuildWithData 
						key={objectivesGuild.id} 
						GLOBALS={GLOBALS} 
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
		const { data, id, color, objectives, GLOBALS } = this.props; 		
		const { guild } = data;
		
		return (
			<tr className={`row team-${color}`}>
				<td className="text-center" style={{width: 172}}>
					<img src={`https://guilds.gw2w2w.com/${id}.svg`} width="160" height="160" alt={id} /> 						
				</td>
				<td className="" valign="center">
					{guild ? (
						<h4>
							{guild.name}
							{' '}
							<small>[{guild.tag}]</small>
						</h4>
					) : <Loading />}
					
					<GuildObjectives guildObjectives={objectives} GLOBALS={GLOBALS}/>
				</td>
			</tr>
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
			<li key={objective.id} className="guild-objective">
				<ReactInterval timeout={refreshInterval} enabled={true} callback={() => this.setState({ now: moment() })} />
				
				<span className="objective-timer">{moment(guildObjective.lastFlipped).twitter()}</span>
				<span className="objective-name">{_.get(objective, [GLOBALS.lang.slug, 'name'])}</span>
			</li>
		);
	}
}


const GuildWithData = graphql(GuildQuery, {
	options: {
		shouldBatch: false,
	},
})(Guild);

export default Guilds;

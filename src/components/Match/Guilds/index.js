import React, { Component, PureComponent } from 'react';
// import moment from 'moment';
import ReactInterval from 'react-interval';
import moment from 'moment-twitter';
// import { graphql } from 'react-apollo';
import _ from 'lodash';

// import Matches from './Matches/index';
// import Worlds from './Worlds/index';

// import { Loading } from 'src/components/Util';

// import MatchQuery from 'src/gql/match';

class Guilds extends Component {	
	render() {
		const { objectives, GLOBALS } = this.props;
		
		const guilds = _.chain(objectives)
			.filter(o => o.claimed_by)
			.groupBy('claimed_by')
			.map((objectives, guildId) => {
				const color = objectives[0].owner.toLowerCase();
				
				objectives = _.chain(objectives)
					.map(o => ({
						id: o.id,
						lastFlipped: o.last_flipped,
					}))
					.sortBy('lastFlipped')
					.reverse()
					.value();
				
				const lastFlippedMin = moment(_.minBy(objectives, 'lastFlipped').lastFlipped);
				const lastFlippedMax = moment(_.maxBy(objectives, 'lastFlipped').lastFlipped);
				
				return {
					id: guildId,
					color,
					lastFlippedMin,
					lastFlippedMax,
					objectives,
				};
			})
			.sortBy('lastFlippedMax')
			.reverse()
			.keyBy('id')
			.value();

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

class Guild extends Component {
	constructor() {
		super();
		
		this.state = {
			now: moment(),
		};
	} 
	
	render() {
		const { guild, GLOBALS } = this.props;
		const { now } = this.state;
		
		const ageInSeconds = now.diff(guild.lastFlippedMax, 'seconds');
		
		let interval = 1 * 1000;
		
		if (ageInSeconds < 60) {
			interval = 1 * 1000;
		} else if (ageInSeconds < 60 * 10) {
			interval = 10 * 1000;
		} else {
			interval = 60 * 1000;
		}
		
		return (
			<div className={`row team-${guild.color}`}>
				<ReactInterval timeout={interval} enabled={true} callback={() => this.setState({ now: moment() })} />
				
				<div className="col-sm-auto" style={{width: 128}}>
					<img src={`https://guilds.gw2w2w.com/${guild.id}.svg`} width="128" height="128" alt={guild.id} /> 						
				</div>
				<div className="col align-self-center">
					<h1>
						{guild.id.split('-')[0]}
						{' '}
						<small>[{guild.id.split('-')[1]}]</small>
					</h1>
					<ul className="list-unstyled">
						{_.map(guild.objectives, guildObjective => {
							const objective = _.find(GLOBALS.objectives, { id: guildObjective.id });
							
							return (
								<li key={objective.id}>
									{moment(guildObjective.lastFlipped).twitter()}
									{' '}
									{_.get(objective, [GLOBALS.lang.slug, 'name'])}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
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

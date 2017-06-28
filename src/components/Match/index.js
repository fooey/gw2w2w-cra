import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';

import { getWorldBySlug } from 'src/lib/world';
import { getTeamColor } from 'src/lib/match';
import { didAnyPropUpdate } from 'src/lib/util';

// import Matches from './Matches/index';
import Scoreboards from './Scoreboards/index';
import Objectives from './Objectives/index';
import Guilds from './Guilds/index';

import { Loading } from 'src/components/Util';

import MatchQuery from 'src/gql/match';




class Match extends Component {
	shouldComponentUpdate(nextProps) {
		return didAnyPropUpdate(this.props, nextProps, [
			'langSlug',
			'worldSlug',
			'data.load',
			'data.match.last_modified',
			'data.match.scores',
		]);
	}

	render() {
		console.log('Match');

		const { data, langSlug, worldSlug } = this.props;
		const { /*loading,*/ match } = data;

		if (_.isEmpty(match)) return <div className="overview container"><div className="row"><div className="col"><Loading /></div></div></div>;
		// if (_.isEmpty(match)) return <h1>err, matchData not found</h1>;


		const world = getWorldBySlug(worldSlug);
		const teamColor = getTeamColor(match.all_worlds, world.id);

		document.body.classList.toggle('match-team-red', teamColor === 'red');
		document.body.classList.toggle('match-team-green', teamColor === 'green');
		document.body.classList.toggle('match-team-blue', teamColor === 'blue');

		const objectives = _.chain(match)
			.get('maps')
			.map('objectives')
			.flatten()
			.value();

		return (
			<div className="match">
				<header>
					<Scoreboards langSlug={langSlug} worldSlug={worldSlug} match={match} />
				</header>

				<Objectives langSlug={langSlug} match={match} objectives={objectives} />

				<Guilds langSlug={langSlug} objectives={objectives} />
			</div>
		);
	}
}

const MatchWithData = graphql(MatchQuery, {
	options: ({ worldSlug }) => ({
		shouldBatch: true,
		'network-only': true,
		pollInterval: 1000 * 1,
		variables: { worldSlug },
	}),
})(Match);

export default MatchWithData;

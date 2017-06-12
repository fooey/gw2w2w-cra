import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';

import { getWorldBySlug } from 'src/lib/world';
import { getTeamColor } from 'src/lib/match';

// import Matches from './Matches/index';
import Guilds from './Guilds/index';
import Scoreboards from './Scoreboards/index';

import { Loading } from 'src/components/Util';

import MatchQuery from 'src/gql/match';




class Match extends Component {
	shouldComponentUpdate(nextProps) {
		if (_.isEmpty(this.props) || _.isEmpty(nextProps)) {
			return true;
		}

		const langSlugChanged = this.didLangChange(nextProps);
		const worldSlugChanged = langSlugChanged || this.didWorldChange(nextProps);
		const loadingStateChanged = worldSlugChanged || this.didLoadingStateChange(nextProps);
		const lastModChanged = loadingStateChanged || this.didLastModChange(nextProps);
		const scoresChanged = lastModChanged || this.didScoresChange(nextProps);

		const shouldUpdate = (langSlugChanged || worldSlugChanged || loadingStateChanged || lastModChanged || scoresChanged);

		// console.log('Match', { shouldUpdate, loadingStateChanged, lastModChanged, scoresChanged });

		return shouldUpdate;
	}

	didLangChange(nextProps) {
		const langSlug = _.get(this.props, 'langSlug');
		const nextLangSlug = _.get(nextProps, 'langSlug');

		return langSlug !== nextLangSlug;
	}

	didWorldChange(nextProps) {
		const worldSlug = _.get(this.props, 'worldSlug');
		const nextWorldSlug = _.get(nextProps, 'worldSlug');

		return worldSlug !== nextWorldSlug;
	}

	didLoadingStateChange(nextProps) {
		const loading = _.get(this.props, 'data.loading');
		const nextLoading = _.get(nextProps, 'data.loading');

		return loading !== nextLoading;
	}

	didLastModChange(nextProps) {
		const lastMod = _.get(this.props, 'data.match.last_modified', 0);
		const nextLastMod = _.get(nextProps, 'data.match.last_modified', 0);

		return lastMod !== nextLastMod;
	}

	didScoresChange(nextProps) {
		const scores = _.get(this.props, 'data.match.scores', {});
		const nextScores = _.get(nextProps, 'data.match.scores', {});

		return !_.isEqual(scores, nextScores);
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

				<div className="container-fluid">
					<div className="row">
						<div className="col">
							<Guilds langSlug={langSlug} objectives={objectives} />
						</div>
					</div>
					{/* <div className="row">
						<div className="col">
							<pre>{JSON.stringify(match, null, '\t')}</pre>
							<pre>{JSON.stringify(ROUTE)}</pre>
						</div>
					</div> */}
				</div>
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

import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';

// import Matches from './Matches/index';
import Guilds from './Guilds/index';

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

		// console.log({ langSlug, nextLangSlug }, langSlug !== nextLangSlug);

		return langSlug !== nextLangSlug;
	}

	didWorldChange(nextProps) {
		const worldSlug = _.get(this.props, 'worldSlug');
		const nextWorldSlug = _.get(nextProps, 'worldSlug');

		// console.log({ worldSlug, nextWorldSlug }, worldSlug !== nextWorldSlug);

		return worldSlug !== nextWorldSlug;
	}

	didLoadingStateChange(nextProps) {
		const loading = _.get(this.props, 'data.loading');
		const nextLoading = _.get(nextProps, 'data.loading');

		// console.log({ loading, nextLoading }, loading !== nextLoading);

		return loading !== nextLoading;
	}

	didLastModChange(nextProps) {
		const lastMod = _.get(this.props, 'data.match.last_modified', 0);
		const nextLastMod = _.get(nextProps, 'data.match.last_modified', 0);

		// console.log({ lastMod, nextLastMod }, lastMod !== nextLastMod);

		return lastMod !== nextLastMod;
	}

	didScoresChange(nextProps) {
		const scores = _.get(this.props, 'data.match.scores', {});
		const nextScores = _.get(nextProps, 'data.match.scores', {});

		// console.log({ scores, nextScores }, !_.isEqual(scores, nextScores));

		return !_.isEqual(scores, nextScores);
	}

	render() {
		console.log('Match');

		const { data, langSlug, worldSlug } = this.props;
		const { loading, match } = data;

		console.log({ data, langSlug, worldSlug });

		if (loading) return <div className="overview container"><div className="row"><div className="col"><Loading /></div></div></div>;
		if (_.isEmpty(match)) return <h1>err, matchData not found</h1>;

		const objectives = _.chain(match)
			.get('maps')
			.map('objectives')
			.flatten()
			.value();

		return (
			<div className="overview container">
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

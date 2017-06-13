import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';

import Matches from './Matches/index';
import Worlds from './Worlds/index';

import { Loading } from 'src/components/Util';
import Card from 'src/components/Layout/Card';

import OverviewQuery from 'src/gql/overview';

class Overview extends Component {
	shouldComponentUpdate(nextProps) {
		if (_.isEmpty(this.props) || _.isEmpty(nextProps)) {
			return true;
		}

		// const lastMod = _.chain(this.props).get('data.matches').maxBy('last_modified').get('last_modified', 0).value();
		// const nextLastMod = _.chain(nextProps).get('data.matches').maxBy('last_modified').get('last_modified', 0).value();

		// const matches = _.get(this.props, 'data.matches');
		// const nextMatches = _.get(nextProps, 'data.matches');

		const scores = _.chain(this.props).get('data.matches').map('scores').value();
		const nextScores = _.chain(nextProps).get('data.matches').map('scores').value();

		// console.log('scores', scores);
		// console.log('nextScores', nextScores);

		const langSlugChanged = !_.isEqual(_.get(this.props, 'langSlug'), _.get(nextProps, 'langSlug'));
		const loadingChanged = langSlugChanged || !_.isEqual(_.get(this.props, 'data.loading'), _.get(nextProps, 'data.loading'));
		// const matchesChanged = loadingChanged || !_.isEqual(_.get(this.props, 'data.matches'), _.get(nextProps, 'data.matches'));
		// const lastModChanged = loadingChanged || lastMod !== nextLastMod;
		// const matchesChanged = loadingChanged || !_.isEqual(matches, nextMatches);
		const scoresChanged = loadingChanged || !_.isEqual(scores, nextScores);

		const shouldUpdate = (langSlugChanged || loadingChanged || scoresChanged);

		// console.log('Overview', { shouldUpdate, loadingChanged, scoresChanged });

		return shouldUpdate;
	}

	render() {
		const { data, langSlug } = this.props;
		const { loading, matches } = data;

		document.body.classList.toggle('match-team-red', false);
		document.body.classList.toggle('match-team-green', false);
		document.body.classList.toggle('match-team-blue', false);

		return (
			<div className="overview">
				<Card>
					{loading ? <Loading /> : <Matches langSlug={langSlug} matches={matches} />}
				</Card>
				<Card>
					<Worlds langSlug={langSlug} />
				</Card>
			</div>
		);
	}
}

const OverviewWithData = graphql(OverviewQuery, {
	options: {
		'network-only': true,
		shouldBatch: true,
		pollInterval: 1000 * 1,
	},
})(Overview);

export default OverviewWithData;

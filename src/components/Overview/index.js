import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';

import Matches from './Matches/index';
import Worlds from './Worlds/index';

import { Loading } from 'src/components/Util';

import OverviewQuery from 'src/gql/overview';

class Overview extends PureComponent {
	render() {
		const { data, ROUTE } = this.props;
		const { loading, matches } = data;

		if (loading) return <div className="overview container"><div className="row"><div className="col"><Loading /></div></div></div>;
		if (_.isEmpty(matches)) return <h1>err, matchData not found</h1>;

		return (
			<div className="overview container">
				<div className="row">
					<div className="col">
						<Matches ROUTE={ROUTE} matches={matches} />
					</div>
				</div>
				<div className="row">
					<div className="col">
						<Worlds ROUTE={ROUTE} />
					</div>
				</div>
			</div>
		);
	}
}

const OverviewWithData = graphql(OverviewQuery, {
	options: {
		'network-only': true,
		shouldBatch: true,
		pollInterval: 1000 * 8,
	},
})(Overview);

export default OverviewWithData;

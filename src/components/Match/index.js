import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';

// import Matches from './Matches/index';
// import Worlds from './Worlds/index';

import { Loading } from 'src/components/Util';

import MatchQuery from 'src/gql/match';

class Match extends PureComponent {
	render() {
		const { data, GLOBALS } = this.props;
		const { loading, match } = data;
		
		console.log('data', data);
		console.log('match', match);

		if (loading) return <div className="overview container"><div className="row"><div className="col"><Loading /></div></div></div>;
		if (_.isEmpty(match)) return <h1>err, matchData not found</h1>;

		return (
			<div className="overview container">
				<div className="row">
					<div className="col">
						<pre>{JSON.stringify(match, null, '\t')}</pre>
						<pre>{JSON.stringify(GLOBALS)}</pre>
					</div>
				</div>
			</div>
		);
	}
}

const MatchWithData = graphql(MatchQuery, {
	options: ({ GLOBALS }) => ({
		shouldBatch: true,
		pollInterval: 1000 * 8,
		variables: {
			worldId: GLOBALS.world.id,
		},
	}),
})(Match);

export default MatchWithData;

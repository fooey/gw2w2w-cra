import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';

// import Matches from './Matches/index';
import Guilds from './Guilds/index';

import { Loading } from 'src/components/Util';

import MatchQuery from 'src/gql/match';

class Match extends PureComponent {
	render() {
		console.log('Match');
	
		const { data, GLOBALS } = this.props;
		const { loading, match } = data;

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
						<Guilds GLOBALS={GLOBALS} objectives={objectives} />
					</div>
				</div>
				{/* <div className="row">
					<div className="col">
						<pre>{JSON.stringify(match, null, '\t')}</pre>
						<pre>{JSON.stringify(GLOBALS)}</pre>
					</div>
				</div> */}
			</div>
		);
	}
}

const MatchWithData = graphql(MatchQuery, {
	options: ({ GLOBALS }) => ({
		shouldBatch: true,
		pollInterval: 1000 * 1,
		variables: {
			worldId: GLOBALS.world.id,
		},
	}),
})(Match);

export default MatchWithData;

import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';

import Matches from './Matches/index';
import Worlds from './Worlds/index';

import { Loading } from 'src/components/Util';

import OverviewQuery from 'src/gql/overview';

class Overview extends PureComponent {
    render() {
		const { data, lang } = this.props;
		const { loading, matches } = data;

		if (loading) return <div className="overview container"><div className="row"><div className="col"><Loading /></div></div></div>;
		if (_.isEmpty(matches)) return <h1>err, matchData not found</h1>;
		if (_.isEmpty(lang)) return <h1>err, lang not found</h1>;
		
		const worldIds = _.chain(matches)
			.map('world_ids')
			.flatten()
			.uniq()
			.sort()
			.value();

		return (
			<div className="overview container">
				<div className="row">
					<div className="col">
						<Matches currentLang={lang} matches={matches} />
					</div>
				</div>
				<div className="row">
					<div className="col">
						{(_.isEmpty(worldIds)) ? 
							<h1>err, no worlds  found</h1> : 
							<Worlds currentLang={lang} worldIds={worldIds} />}						
					</div>
				</div>
			</div>
		);
	}
}

const OverviewWithData = graphql(OverviewQuery, {
	options: {
		shouldBatch: true,
		pollInterval: 1000 * 4,
	},
})(Overview);

export default OverviewWithData;

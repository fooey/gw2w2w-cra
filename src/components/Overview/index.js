import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';

import Matches from './Matches/index';
import Worlds from './Worlds/index';

import { Loading } from 'src/components/Util';

import OverviewQuery from 'src/gql/overview';

class Overview extends PureComponent {
    render() {
		const { data, langSlug } = this.props;
		const { loading, matches, lang } = data;

		if (loading) return <div className="overview container"><div className="row"><div className="col"><Loading /></div></div></div>;
		if (_.isEmpty(matches)) return <h1>err</h1>;

		return (
			<div className="overview container">
				<div className="row">
					<div className="col">
						<Matches currentLang={lang} matches={matches} />
					</div>
				</div>
				<div className="row">
					<div className="col">
						<Worlds currentLang={lang} />
					</div>
				</div>
			</div>
		);
	}
}

const OverviewWithData = graphql(OverviewQuery, {
	options: ({ langSlug }) => ({
		shouldBatch: true,
		pollInterval: 1000 * 4,
        variables: {
            slug: langSlug
        }
	})
})(Overview);

export default OverviewWithData;

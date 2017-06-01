import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';

import Matches from './Matches/index';
import Worlds from './Worlds/index';

import { Loading } from 'src/components/Util';

import OverviewQuery from 'src/gql/overview';

class Overview extends Component {
	shouldComponentUpdate(nextProps) {
		if (_.isEmpty(this.props) || _.isEmpty(nextProps)) {
			return true;
		}
		
		const lastMod = _.chain(this.props).get('data.matches').maxBy('last_modified').get('last_modified', 0).value();
		const nextLastMod = _.chain(nextProps).get('data.matches').maxBy('last_modified').get('last_modified', 0).value();
		
		const langSlugChanged = !_.isEqual(_.get(this.props, 'langSlug'), _.get(nextProps, 'langSlug'));
		const loadingChanged = langSlugChanged || !_.isEqual(_.get(this.props, 'data.loading'), _.get(nextProps, 'data.loading'));
		// const matchesChanged = loadingChanged || !_.isEqual(_.get(this.props, 'data.matches'), _.get(nextProps, 'data.matches'));
		const matchesChanged = loadingChanged || lastMod !== nextLastMod;
		
		const shouldUpdate = (langSlugChanged || loadingChanged || matchesChanged);

		console.log('Overview', { shouldUpdate, loadingChanged, matchesChanged, lastMod, nextLastMod });
				
		return shouldUpdate;
	}
	
	render() {
		const { data, langSlug } = this.props;
		const { loading, matches } = data;

		return (
			<div className="overview container">
				<div className="row">
					<div className="col">
						{loading ? <Loading /> : <Matches langSlug={langSlug} matches={matches} />}
					</div>
				</div>
				<div className="row">
					<div className="col">
						<Worlds langSlug={langSlug} />
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
		pollInterval: 1000 * 1,
	},
})(Overview);

export default OverviewWithData;

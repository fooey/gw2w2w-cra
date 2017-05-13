
import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
// import { Link } from 'react-router-dom'
import _ from 'lodash';
import classnames from 'classnames';

import WorldQuery from 'src/gql/world';


class MatchWorld extends PureComponent {
    render() {
        const { data, color, currentLang } = this.props;
		const { loading, world } = data;

		const className = classnames({
			"match-worlds-world": true,
			[`team-${color}`]: true,
		});

        if (loading) return <div>Loading</div>;

        return (
			<div className={className}>
				{_.get(world, [currentLang.slug, 'name'], 'ERR')}
			</div>
		);
    }
}

export default graphql(WorldQuery, {
	options: { shouldBatch: true }
})(MatchWorld);

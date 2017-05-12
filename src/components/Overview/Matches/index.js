import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import numeral from 'numeral';

import MatchWorld from './World';

const COLORS = ['red', 'blue', 'green'];
const REGIONS = ['NA', 'EU'];
const LANG_SLUG = 'en';

const Matches = ({ matches }) => (
	<div className="row">
		{_.map(REGIONS, region => (
			<div className="col-md" key={region}>
				{_.chain(matches)
					.filter({ region })
					.sortBy('id')
					.map((match, i) => <Match key={match.id} match={match} i={i} />)
					.value()}
			</div>
		))}
	</div>
);




const Match = ({ match, i }) =>  (
	<div key={match.id} className={`match row align-items-center row-${i%2}`}>
		<div className="col-md-auto text-center"><Pie matchScores={match.scores} /></div>
		<div className="col"><MatchWorlds matchWorlds={match.worlds} /></div>
		<div className="col-md-auto"><MatchScores matchScores={match.scores} /></div>
	</div>
);

const MatchWorlds = ({ matchWorlds }) => (
	<div className="match-worlds">{
		_.map(COLORS, color => <MatchWorld
			key={color}
			color={color}
			langSlug={LANG_SLUG}
			id={_.get(matchWorlds, `${color}_id`)}
		/>)
	}</div>
);

const MatchScores = ({ matchScores }) => (
	<div className="match-scores">{
		_.map(COLORS, (color) => {
			const className = classnames({
				"match-scores-world": true,
				[`team-${color}`]: true,
			});

			return (
				<div key={color} className={className}>
					{numeral(matchScores[color]).format(',')}
				</div>
			);
		})
	}</div>
);

const Pie = ({ matchScores }) => {
    const scores = _.values(_.pick(matchScores, ['red', 'blue', 'green']));
    const pielySrc = `https://piely.net/${scores.join()}.svg`;

    return <img className="match-scores-pie" src={pielySrc} width="64" alt="" />;
};





export default Matches;

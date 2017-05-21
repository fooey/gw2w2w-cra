import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import numeral from 'numeral';

import MatchWorld from './World';

const COLORS = ['red', 'blue', 'green'];
const REGIONS = ['NA', 'EU'];
// const LANG_SLUG = 'en';

const Matches = ({ matches, GLOBALS }) => (
	<div className="row">
		{_.map(REGIONS, region => (
			<div className="col-md" key={region}>
				<table className="matches">
					<tbody>
						{_.chain(matches)
							.filter({ region })
							.sortBy('id')
							.map((match, i) => <Match key={match.id} i={i} match={match} GLOBALS={GLOBALS} />)
							.value()}
					</tbody>
				</table>
			</div>
		))}
	</div>
);




const Match = ({ match, GLOBALS }) =>  (
	<tr key={match.id} className={`match`}>
		<td className="match-pie"><Pie matchScores={match.scores} /></td>
		<td className="match-worlds"><MatchWorlds matchWorlds={match.worlds} GLOBALS={GLOBALS} /></td>
		<td className="match-scores"><MatchScores matchScores={match.scores} /></td>
	</tr>
);

const MatchWorlds = ({ matchWorlds, GLOBALS }) => (
	<div className="match-worlds">{
		_.map(COLORS, color => {
			const worldId = _.get(matchWorlds, `${color}_id`);
			const world = _.find(GLOBALS.worlds, { id: worldId });
			
			return (
				<MatchWorld
					key={color}
					color={color}
					GLOBALS={GLOBALS}
					world={world}
				/>
			);
		})
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
	const pielySrc = `https://www.piely.net/${scores.join()}.svg`;

	return <img className="match-scores-pie" src={pielySrc} width="64" alt="" />;
};





export default Matches;

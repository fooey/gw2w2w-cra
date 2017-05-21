import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import numeral from 'numeral';

import MatchWorld from './World';

const COLORS = ['red', 'blue', 'green'];
const REGIONS = ['NA', 'EU'];
// const LANG_SLUG = 'en';

const Matches = ({ matches, currentLang }) => (
	<div className="row">
		{_.map(REGIONS, region => (
			<div className="col-md" key={region}>
				<table className="matches">
					<tbody>
						{_.chain(matches)
							.filter({ region })
							.sortBy('id')
							.map((match, i) => <Match key={match.id} i={i} match={match} currentLang={currentLang} />)
							.value()}
					</tbody>
				</table>
			</div>
		))}
	</div>
);




const Match = ({ match, currentLang }) =>  (
	<tr key={match.id} className={`match`}>
		<td className="match-pie"><Pie matchScores={match.scores} /></td>
		<td className="match-worlds"><MatchWorlds matchWorlds={match.worlds} currentLang={currentLang} /></td>
		<td className="match-scores"><MatchScores matchScores={match.scores} /></td>
	</tr>
);

const MatchWorlds = ({ matchWorlds, currentLang }) => (
	<div className="match-worlds">{
		_.map(COLORS, color => <MatchWorld
			key={color}
			color={color}
			currentLang={currentLang}
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
	const pielySrc = `https://www.piely.net/${scores.join()}.svg`;

	return <img className="match-scores-pie" src={pielySrc} width="64" alt="" />;
};





export default Matches;

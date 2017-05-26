import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import classnames from 'classnames';
import numeral from 'numeral';


import STATIC from 'src/data/static';


const Matches = ({ matches, ROUTE }) => (
	<div className="row">
		{_.map(STATIC.regions, region => (
			<div className="col-md" key={region}>
				<table className="matches">
					<tbody>
						{_.chain(matches)
							.filter({ region })
							.sortBy('id')
							.map((match, i) => <Match key={match.id} i={i} match={match} ROUTE={ROUTE} />)
							.value()}
					</tbody>
				</table>
			</div>
		))}
	</div>
);


const Match = ({ match, ROUTE }) =>  (
	<tr key={match.id} className={`match`}>
		<td className="match-pie"><Pie matchScores={match.scores} /></td>
		<td className="match-worlds"><MatchWorlds matchWorlds={match.worlds} ROUTE={ROUTE} /></td>
		<td className="match-scores"><MatchScores matchScores={match.scores} /></td>
	</tr>
);


const MatchWorlds = ({ matchWorlds, ROUTE }) => (
	<div className="match-worlds">{
		_.map(STATIC.colors, color => {
			const worldId = _.get(matchWorlds, `${color}_id`);
			const world = _.find(STATIC.worlds, { id: worldId });
			
			return (
				<MatchWorld
					key={color}
					color={color}
					ROUTE={ROUTE}
					world={world}
				/>
			);
		})
	}</div>
);


const MatchWorld = ({ ROUTE, color, world }) => {
	const className = classnames({
		"d-block": true,
		"match-worlds-world": true,
		[`team-${color}`]: true,
	});
	
	const worldName = _.get(world, [ROUTE.lang.slug, 'name'], 'ERR');
	const worldSlug = _.get(world, [ROUTE.lang.slug, 'slug'], 'ERR');
	const worldLink = ['', ROUTE.lang.slug, worldSlug].join('/');

	return <Link to={worldLink} className={className}>{worldName}</Link>;
};


const MatchScores = ({ matchScores }) => (
	<div className="match-scores">{
		_.map(STATIC.colors, (color) => {
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

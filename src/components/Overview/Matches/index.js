import React, { Component, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import classnames from 'classnames';
import numeral from 'numeral';


import STATIC from 'src/data/static';


class Matches extends PureComponent {
	render() {
		const { matches, langSlug } = this.props;
		
		return (
			<div className="row">
				{_.map(STATIC.regions, region => (
					<div className="col-md" key={region}>
						<table className="matches">
							<tbody>
								{_.chain(matches)
									.filter({ region })
									.sortBy('id')
									.map((match, i) => <Match key={match.id} i={i} match={match} langSlug={langSlug} />)
									.value()}
							</tbody>
						</table>
					</div>
				))}
			</div>
		);
	}	
}


class Match extends PureComponent {
	render() {
		const { match, langSlug } = this.props;
		
		return (
			<tr key={match.id} className={`match`}>
				<td className="match-pie"><Pie matchScores={match.scores} /></td>
				<td className="match-worlds"><MatchWorlds matchWorlds={match.worlds} langSlug={langSlug} /></td>
				<td className="match-scores"><MatchScores matchScores={match.scores} /></td>
			</tr>
		);
	}	
}


class MatchWorlds extends PureComponent {
	render() {
		const { matchWorlds, langSlug } = this.props;
		
		return  (
			<div className="match-worlds">{
				_.map(STATIC.colors, color => {
					const worldId = _.get(matchWorlds, `${color}_id`);
					const world = _.find(STATIC.worlds, { id: worldId });
					
					return (
						<MatchWorld
							key={color}
							color={color}
							langSlug={langSlug}
							world={world}
						/>
					);
				})
			}</div>
		);
	}	
}


class MatchWorld extends PureComponent {
	render() {
		const { color, world, langSlug } = this.props;
		
		const className = classnames({
			"d-block": true,
			"match-worlds-world": true,
			[`team-${color}`]: true,
		});
		
		const worldName = _.get(world, [langSlug, 'name'], 'ERR');
		const worldSlug = _.get(world, [langSlug, 'slug'], 'ERR');
		const worldLink = ['', langSlug, worldSlug].join('/');

		return (
			<Link to={worldLink} className={className}>{worldName}</Link>
		);
	}	
}


class MatchScores extends Component {
	shouldComponentUpdate(nextProps) {
		return !_.isEqual(this.props.matchScores, nextProps.matchScores);
	}
	
	render() {
		const { matchScores } = this.props;
		
		return (
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
	}
}


class Pie extends Component {
	shouldComponentUpdate(nextProps) {
		return !_.isEqual(this.props.matchScores, nextProps.matchScores);
	}
	
	render() {
		const { matchScores } = this.props;
		
		const scores = _.values(_.pick(matchScores, ['red', 'blue', 'green']));
		const pielySrc = `https://www.piely.net/${scores.join()}.svg`;

		return (
			<img className="match-scores-pie" src={pielySrc} width="64" alt={scores.join('/')} title={scores.join('/')} />
		);
	}
}





export default Matches;

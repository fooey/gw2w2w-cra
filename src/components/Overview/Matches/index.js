import React, { Component, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import numeral from 'numeral';

import Card from 'src/components/Layout/Card';

import STATIC from 'src/data/static';
import { getWorld } from 'src/lib/world';


class Matches extends PureComponent {
	render() {
		const { matches, langSlug } = this.props;

		return (
			<div className="matches">
				{_.map(STATIC.regions, region => (
					<Card level="1" className="matches-region" key={region}>
						{_.chain(matches)
							.filter({ region })
							.sortBy('id')
							.map((match, i) => <Match key={match.id} i={i} match={match} langSlug={langSlug} />)
							.value()}
					</Card>
				))}
			</div>
		);
	}
}


class Match extends Component {
	shouldComponentUpdate(nextProps) {
		if (_.isEmpty(this.props) || _.isEmpty(nextProps)) {
			return true;
		}

		const scores = _.get(this.props, 'match.scores', {});
		const nextScores = _.get(nextProps, 'match.scores', {});

		const langSlugChanged = !_.isEqual(_.get(this.props, 'langSlug'), _.get(nextProps, 'langSlug'));
		const scoresChanged = langSlugChanged || !_.isEqual(scores, nextScores);

		const shouldUpdate = (langSlugChanged || scoresChanged);

		// console.log('Overview', 'Match', { shouldUpdate, scoresChanged, langSlugChanged, scores, nextScores });

		return shouldUpdate;
	}

	render() {
		const { match, langSlug } = this.props;

		const scores = _.pick(match.scores, ['red', 'blue', 'green']);

		return (
			<div key={match.id} className="match">
				<div className="match-pie"><Pie {...scores} /></div>
				<div className="match-worlds">{
					_.map(STATIC.colors, color => {
						const worldId = _.get(match.worlds, `${color}_id`);
						const world = getWorld(worldId);
						const score = _.get(match, ['scores', color]);

						return (
							<MatchWorld
								key={color}
								color={color}
								langSlug={langSlug}
								score={score}
								world={world}
							/>
						);
					})
				}</div>
				{/* <div className="match-worlds">
					<MatchWorlds matchWorlds={match.worlds} langSlug={langSlug} />
					<MatchScores {...scores} />
				</div> */}
			</div>
		);
	}
}


class Pie extends PureComponent {
	render() {
		const { red, blue, green } = this.props;
		const arr = [red, blue, green];

		const pielySrc = `https://www.piely.net/${arr.join(',')}.svg`;

		return (
			<img className="match-scores-pie" src={pielySrc} alt={arr.join('/')} title={arr.join('/')} />
		);
	}
}


class MatchWorld extends PureComponent {
	render() {
		const { color, world, langSlug, score } = this.props;

		const worldName = _.get(world, [langSlug, 'name'], 'ERR');
		const worldSlug = _.get(world, [langSlug, 'slug'], 'ERR');
		const worldLink = ['', langSlug, worldSlug].join('/');

		return (
			<Link key={color} to={worldLink} className={`match-world team-${color}`}>
				<span className="match-world-name">{worldName}</span>
				<span className="match-world-score">{numeral(score).format(',')}</span>
			</Link>
		);
	}
}
//
//
// class MatchScore extends PureComponent {
// 	render() {
// 		const { score } = this.props;
//
// 		return (
// 			<div className="match-world-score"></div>
// 		);
// 	}
// }




// class MatchWorlds extends PureComponent {
// 	render() {
// 		const { matchWorlds, langSlug } = this.props;
//
// 		return  (
// 			<div className="match-worlds-names">{
// 				_.map(STATIC.colors, color => {
// 					const worldId = _.get(matchWorlds, `${color}_id`);
// 					const world = _.find(STATIC.worlds, { id: worldId });
//
// 					return (
// 						<MatchWorld
// 							key={color}
// 							color={color}
// 							langSlug={langSlug}
// 							world={world}
// 						/>
// 					);
// 				})
// 			}</div>
// 		);
// 	}
// }


// class MatchScores extends PureComponent {
// 	render() {
// 		// const { red, blue, green } = this.props;
//
// 		return (
// 			<div className="match-worlds-scores">{
// 				_.map(STATIC.colors, color =>
// 					<MatchScore
// 						key={color}
// 						color={color}
// 						score={this.props[color]} />
// 				)
// 			}</div>
// 		);
// 	}
// }





export default Matches;

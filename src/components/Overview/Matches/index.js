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
			<div className="matches">
				{_.map(STATIC.regions, region => (
					<div className="matches-region" key={region}>
						{_.chain(matches)
							.filter({ region })
							.sortBy('id')
							.map((match, i) => <Match key={match.id} i={i} match={match} langSlug={langSlug} />)
							.value()}
					</div>
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

		return (
			<div key={match.id} className="match">
				<div className="match-pie"><Pie matchScores={match.scores} /></div>
				<div className="match-worlds">
					<MatchWorlds matchWorlds={match.worlds} langSlug={langSlug} />
					<MatchScores matchScores={match.scores} />
				</div>
			</div>
		);
	}
}


class MatchWorlds extends PureComponent {
	render() {
		const { matchWorlds, langSlug } = this.props;

		return  (
			<div className="match-worlds-names">{
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
			[`team-${color}`]: true,
		});

		const worldName = _.get(world, [langSlug, 'name'], 'ERR');
		const worldSlug = _.get(world, [langSlug, 'slug'], 'ERR');
		const worldLink = ['', langSlug, worldSlug].join('/');

		return (
			<div className="match-world-name">
				<Link to={worldLink} className={className}>{worldName}</Link>
			</div>
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
			<div className="match-worlds-scores">{
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
			<img className="match-scores-pie" src={pielySrc} width="72" alt={scores.join('/')} title={scores.join('/')} />
		);
	}
}





export default Matches;

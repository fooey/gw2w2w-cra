import React, { Component, PureComponent } from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import moment from 'moment-twitter';

import ReactInterval from 'react-interval';

import { getRefreshInterval, getAboutNow } from 'src/lib/time';

import Castle from 'src/components/svg/castle.js';
import Keep from 'src/components/svg/keep.js';
import Tower from 'src/components/svg/tower.js';
import Camp from 'src/components/svg/camp.js';


const COLOR_MAP = {
	red: '#a94442',
	green: '#3c763d',
	blue: '#31708f',
	none: '#999999',
};

const DEFAULT_COLOR = COLOR_MAP['none'];


const SVG_COMPONENT_MAP = {
	castle: Castle,
	keep: Keep,
	tower: Tower,
	camp: Camp,
};

const DEFAULT_SVG_COMPONENT = SVG_COMPONENT_MAP['camp'];


export class IconSVG extends PureComponent {
	render() {
		const { type, color, size="32" } = this.props;
		const typeKey = type.toLowerCase();

		const fillColor = _.get(COLOR_MAP, color, DEFAULT_COLOR);
		const Component = _.get(SVG_COMPONENT_MAP, typeKey, DEFAULT_SVG_COMPONENT);

		const props = {
			width: size,
			height: size,
			fillColor,
		};

		return <Component {...props} />;
	}
}


export class Icon extends PureComponent {
	render() {
		const { type, color } = this.props;

		return <span className="objective-icon"><IconSVG type={type} color={color} /></span>;
	}
}


export class Name extends PureComponent {
	render() {
		const { objective, langSlug } = this.props;

		return <span className="objective-name">{_.get(objective, [langSlug, 'name'])}</span>;
	}
}


export class Duration extends Component {
	constructor() {
		super();

		this.state = {
			now: getAboutNow(),
		};
	}

	render() {
		const { lastFlipped } = this.props;
		const { now } = this.state;

		const ageInSeconds = Math.floor(now - lastFlipped);
		const refreshInterval = getRefreshInterval(ageInSeconds);

		return (
			<span className="objective-duration">
				<ReactInterval timeout={refreshInterval} enabled={true} callback={() => this.setState({ now: getAboutNow() })} />

				{moment(lastFlipped * 1000).twitter()}
			</span>
		);
	}
}

export class Cooldown extends Component {
	constructor() {
		super();

		this.state = {
			now: getAboutNow(),
		};
	}

	render() {
		const { lastFlipped } = this.props;
		const { now } = this.state;

		// const ageInSeconds = Math.floor(now - lastFlipped);

		const expiration = lastFlipped + (60 * 5);
		const buffRemaining = expiration - now;
		const refreshInterval = getRefreshInterval(buffRemaining);
		const spotlight = (buffRemaining < 30 && buffRemaining > -10);

		return (
			<span className={classnames("objective-cooldown", { spotlight })} title={`${buffRemaining} seconds remaining`}>
				<ReactInterval timeout={refreshInterval} enabled={true} callback={() => this.setState({ now: getAboutNow() })} />

				{/* {moment(lastFlipped * 1000).twitter()} */}
				{/* {' '} */}
				{(buffRemaining > -10 )
					? (buffRemaining < 99)
						? buffRemaining
						: moment(expiration * 1000).twitter()
					: null}
			</span>
		);
	}
}

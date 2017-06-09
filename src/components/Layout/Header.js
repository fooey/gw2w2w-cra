import React, { Component, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import _ from 'lodash';

import Logo from 'src/components/svg/logo.js';

import { getWorldBySlug } from 'src/lib/world';
import { getLangBySlug } from 'src/lib/lang';

import STATIC from 'src/data/static';

class Langs extends PureComponent {
	render() {
		const { langSlug, worldSlug } = this.props;

		const world = getWorldBySlug(worldSlug);
		const lang = getLangBySlug(langSlug);

		// console.log('Langs', { lang, world });

		return (
			<nav id="navbar">
				<div className="brand">
					<Link to="/" title="logo">
						<Logo fillColor="#a94442" />
					</Link>
					<Link to="/" title="Home">
						GW2W2
					</Link>
				</div>
				<div className='page-nav'>
					{world ? (
						<h1 className='world-title'>
							<Link to={getNavLink(lang, world)}>
								{_.get(world, [langSlug, 'name'])}
							</Link>
						</h1>
					) : null}
					<ul className="nav nav-pills">
						{_.map(STATIC.langs, ixLang =>
							<Lang key={ixLang.slug} lang={ixLang} langSlug={langSlug} world={world} />
						)}
					</ul>
				</div>
			</nav>
		);
	}
}

class Lang extends Component {
	shouldComponentUpdate(nextProps) {
		return _.get(this.props, 'langSlug') !== _.get(nextProps, 'langSlug');
	}

	render() {
		const { lang, langSlug, world } = this.props;

		const link = getNavLink(lang, world);

		const linkClassname = classnames({
			'nav-link': true,
			active: langSlug === lang.slug,
		});

		return (
			<li className="nav-item">
				<Link to={link} title={lang.name} className={linkClassname}>
					{lang.label}
				</Link>
			</li>
		);
	}
}

function getNavLink(lang, world) {
	return  _.without([
		'',
		lang.slug,
		world ? _.get(world, [lang.slug, 'slug']) : null,
	], null).join('/');
}

export default Langs;

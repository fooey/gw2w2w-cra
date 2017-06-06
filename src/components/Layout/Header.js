import React, { Component, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import _ from 'lodash';

import Logo from 'src/img/logo/castle.svg.js';

import { getWorldBySlug } from 'src/lib/world';

import STATIC from 'src/data/static';

class Langs extends PureComponent {		
	render() {
		const { langSlug, worldSlug } = this.props;
		
		// console.log('Langs', { langSlug, worldSlug });
		
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
				<div className="">
					<ul className="nav nav-pills">
						{_.map(STATIC.langs, ixLang => 
							<Lang key={ixLang.slug} lang={ixLang} langSlug={langSlug} worldSlug={worldSlug} />
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
		const { lang, langSlug, worldSlug } = this.props;

		// console.log('Lang', { langSlug, worldSlug });

		const world = getWorldBySlug(worldSlug);

		const link = _.without([
			'',
			lang.slug,
			world ? _.get(world, [lang.slug, 'slug']) : null,
		], null);
		
		const linkClassname = classnames({
			'nav-link': true,
			active: langSlug === lang.slug,
		});

		return (
			<li className="nav-item">
				<Link to={link.join('/')} title={lang.name} className={linkClassname}>
					{lang.label}
				</Link>
			</li>
		);
	}
}

export default Langs;

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import _ from 'lodash';

import { getWorldBySlug } from 'src/lib/world';

import STATIC from 'src/data/static';

class Langs extends PureComponent {		
	render() {
		const { langSlug, worldSlug } = this.props;
		
		// console.log('Langs', { langSlug, worldSlug });
		
		return (
			<nav className="navbar navbar-light bg-faded">
				<div className="container"><div className="row">
					<div className="col">
						<ul className="nav nav-pills">
							<li className="nav-item">
								<Link to="/" title="Home" className="nav-link">gw2w2w</Link>
							</li>
						</ul>
					</div>
					<div className="col-md-auto">
						<ul className="nav nav-pills">
							{_.map(STATIC.langs, ixLang => 
								<Lang key={ixLang.slug} lang={ixLang} langSlug={langSlug} worldSlug={worldSlug} />
							)}
						</ul>
					</div>
				</div></div>
			</nav>
		);
	}
}

class Lang extends PureComponent {
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

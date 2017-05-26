import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import _ from 'lodash';

import STATIC from 'src/data/static';


const Langs = ({ ROUTE }) => (
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
						<Lang key={ixLang.slug} lang={ixLang} world={ROUTE.world} />
					)}
				</ul>
			</div>
		</div></div>
	</nav>
);

const Lang = ({ lang, world }) => {
	const link = _.without([
		'',
		lang.slug,
		world ? _.get(world, [lang.slug, 'slug']) : null,
	], null);

	return (
		<li className="nav-item">
			<NavLink to={link.join('/')} title={lang.name} className="nav-link" activeClassName="active">
				{lang.label}
			</NavLink>
		</li>
	);
};

export default Langs;

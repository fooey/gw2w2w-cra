import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { getLangBySlug } from 'src/lib/lang';

import STATIC from 'src/data/static';

const Worlds = ({ ROUTE }) => (
	<div className="row worlds">
		{_.map(['na', 'eu'], region => (
			<div key={region} className="col-lg">
				{/* <h1 className="region-title">{region}</h1> */}
				<RegionWorlds 
					region={region} 
					ROUTE={ROUTE} 
				/>
			</div>
		))}
	</div>
);


const RegionWorlds = ({ ROUTE, region }) => (
	_.chain(STATIC.worlds)
		.filter({ region })
		.sortBy('id')
		.groupBy('lang')
		.map((langWorlds, langSlug) => {
			const lang = getLangBySlug(langSlug);
			
			return (
				<section key={langSlug} className="region-worlds">
					<h4 className="card-title lang-title">{lang.name} <small className="text-muted">{region}</small></h4>
					<LangWorlds 
						langWorlds={langWorlds} 
						ROUTE={ROUTE} 
					/>
				</section>
			);
		})
		.value()

);

const LangWorlds = ({ langWorlds, ROUTE }) => (
	<ul className="list-unstyled lang-worlds">
		{_.chain(langWorlds)
			.sortBy(world => {
				return _.get(world, [ROUTE.lang.slug, 'name']);
			})
			.map(world => {
				const langWorld = _.get(world, [ROUTE.lang.slug]);

				return <World key={world.id} langWorld={langWorld} ROUTE={ROUTE} />;
			})
			.value()}
	</ul>
);

const World = ({ langWorld, ROUTE }) => (
	<li className="world">
		<Link to={`/${ROUTE.lang.slug}/${langWorld.slug}`}>
			{langWorld.name}
		</Link>
	</li>
);


export default Worlds;

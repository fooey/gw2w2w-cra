import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const Worlds = ({ GLOBALS }) => (
	<div className="row worlds">
		{_.map(['na', 'eu'], region => (
			<div key={region} className="col-lg">
				{/* <h1 className="region-title">{region}</h1> */}
				<RegionWorlds 
					region={region} 
					GLOBALS={GLOBALS} 
				/>
			</div>
		))}
	</div>
);


const RegionWorlds = ({ GLOBALS, region }) => (
	_.chain(GLOBALS.worlds)
		.filter({ region })
		.sortBy('id')
		.groupBy('lang')
		.map((langWorlds, langSlug) => {
			const lang = _.find(GLOBALS.langs, { slug: langSlug });
			
			return (
				<section key={langSlug} className="region-worlds">
					<h4 className="card-title lang-title">{lang.name} <small className="text-muted">{region}</small></h4>
					<LangWorlds 
						langWorlds={langWorlds} 
						GLOBALS={GLOBALS} 
					/>
				</section>
			);
		})
		.value()

);

const LangWorlds = ({ langWorlds, GLOBALS }) => (
	<ul className="list-unstyled lang-worlds">
		{_.chain(langWorlds)
			.sortBy(world => {
				return _.get(world, [GLOBALS.lang.slug, 'name']);
			})
			.map(world => {
				const langWorld = _.get(world, [GLOBALS.lang.slug]);

				return <World key={world.id} langWorld={langWorld} GLOBALS={GLOBALS} />;
			})
			.value()}
	</ul>
);

const World = ({ langWorld, GLOBALS }) => (
	<li className="world">
		<Link to={`/${GLOBALS.lang.slug}/${langWorld.slug}`}>
			{langWorld.name}
		</Link>
	</li>
);


export default Worlds;

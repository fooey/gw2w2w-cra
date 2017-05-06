import React from 'react';
import { gql, graphql } from 'react-apollo';
import { Link } from 'react-router-dom'
import _ from 'lodash';

import { Loading } from 'src/components/Util';

const WorldsQuery = gql`
	query {
		worlds {
			id
			region
			lang
			en { name slug }
			es { name slug }
			de { name slug }
			fr { name slug }
			zh { name slug }
		}
	}
`;
const Worlds = ({ data, langSlug }) => {
	const { worlds, isLoading } = data;

	if (isLoading) { return <Loading />; }

	return (
		<div className="row">
			{_.map(['na', 'eu'], region => (
				<div key={region} className="col">
					<RegionWorlds worlds={worlds} langSlug={langSlug} region={region} />
				</div>
			))}
		</div>
	);
}

const RegionWorlds = ({ worlds, langSlug, region }) => (
	<ul className="nav flex-column">
		{_.chain(worlds)
			.filter({ region })
			.sortBy('id')
			.groupBy('lang')
			.map((langWorlds, worldsLangSlug) => (
				<li key={worldsLangSlug}>
					<ul>
						<LangWorlds langWorlds={langWorlds} langSlug={langSlug} />
					</ul>
						<br />
				</li>
			))
			.value()
		}
	</ul>
);

const LangWorlds = ({ langWorlds, langSlug, region }) => (
	<ul className="nav flex-column">
		{_.chain(langWorlds)
			.sortBy(world => {
				return _.get(world, [langSlug, 'name']);
			})
			.map(world => {
				const langWorld = _.get(world, [langSlug]);

				return <World key={world.id} langWorld={langWorld} langSlug={langSlug} />
			})
			.value()
		}
	</ul>
);

const World = ({ langWorld, langSlug }) => (
	<li className="nav-item">
		<Link className="nav-link" to={`/${langSlug}/${langWorld.slug}`}>
			{langWorld.name}
		</Link>
	</li>
);

const WorldsWithData = graphql(WorldsQuery)(Worlds, { options: { shouldBatch: true } });




export default WorldsWithData;

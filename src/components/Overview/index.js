import React from 'react';
import { gql, graphql } from 'react-apollo';
import { Link } from 'react-router-dom'
import _ from 'lodash';


const Overview = ({ langSlug }) => {
	return (
		<div className="row">
			<div className="col">
				<WorldsWithData langSlug={langSlug} />
			</div>
		</div>
	);
}

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

	if (isLoading) { return <span>Loading...</span>; }

	return (
		<div className="card">
			<h1>lang: {langSlug}</h1>
			<div className="row">
				{_.map(['na', 'eu'], region => (
					<div key={region} className="col">
						<h2>{region}</h2>
						<RegionWorlds worlds={worlds} langSlug={langSlug} region={region} />
					</div>
				))}
			</div>
		</div>
	);
}

const RegionWorlds = ({ worlds, langSlug, region }) => (
	<ul className="nav flex-column">
		{_.chain(worlds)
			.filter({ region })
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

const WorldsWithData = graphql(WorldsQuery)(Worlds);




export default Overview;

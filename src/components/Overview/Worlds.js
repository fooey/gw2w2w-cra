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
			population
			en { name slug }
			es { name slug }
			de { name slug }
			fr { name slug }
			zh { name slug }
		}
	}
`;
const Worlds = ({ data, langSlug }) => {
	const { worlds, loading } = data;

	if (loading) { return <Loading />; }

	return (
		<div className="row worlds">
			{_.map(['na', 'eu'], region => (
				<div key={region} className="col-lg">
					{/* <h1 className="region-title">{region}</h1> */}
					<RegionWorlds worlds={worlds} langSlug={langSlug} region={region} />
				</div>
			))}
		</div>
	);
}

const WorldsWithData = graphql(WorldsQuery)(Worlds, { options: { shouldBatch: true } });


const RegionWorlds = ({ worlds, langSlug, region }) => (
	_.chain(worlds)
		.filter({ region })
		.sortBy('id')
		.groupBy('lang')
		.map((langWorlds, worldsLangSlug) => (
			<section key={worldsLangSlug} className="region-worlds">
				{/* <h4 className="card-title lang-title">{worldsLangSlug} <small className="text-muted">{region}</small></h4> */}
				<LangWorldsWithData langWorlds={langWorlds} region={region} langSlug={langSlug} worldsLangSlug={worldsLangSlug} />
			</section>
		))
		.value()

);

const LangQuery = gql`
	query lang($worldsLangSlug: ID!) {
		lang(slug: $worldsLangSlug) {
			name
			slug
			label
		}
	}
`;
const LangWorlds = ({ data, langWorlds, langSlug, region }) => {
	const { lang, loading } = data;

	if (loading) { return <Loading />; }

	return (
		<div>
			<h5 className="worlds-lang">{lang.name} <small className="text-muted">{region}</small></h5>
			<ul className="list-unstyled lang-worlds">
				{_.chain(langWorlds)
					.sortBy(world => {
						return _.get(world, [langSlug, 'name']);
					})
					.map(world => {
						const langWorld = _.get(world, [langSlug]);

						return <World key={world.id} langWorld={langWorld} langSlug={langSlug} />;
					})
					.value()}
			</ul>
		</div>
	)
};

const LangWorldsWithData = graphql(LangQuery)(LangWorlds, {
	options: (props) => ({
		shouldBatch: true,
		variables: {
			langSlug: props.langSlug
		}
	})
});

const World = ({  langWorld, langSlug }) => (
	<li className="world">
		<Link to={`/${langSlug}/${langWorld.slug}`}>
			{langWorld.name}
		</Link>
	</li>
);





export default WorldsWithData;

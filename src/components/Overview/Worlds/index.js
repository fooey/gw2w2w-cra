import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { Loading } from 'src/components/Util';

import WorldsQuery from 'src/gql/worlds';

class Worlds extends Component {
	shouldComponentUpdate(nextProps) {
		const { data, currentLang, worldIds } = this.props;
		const { data: nextData, currentLang: nextCurrentLang, worldIds: nextWorldIds } = nextProps;
		
		// console.log('nextProps', nextProps);
		// console.log('data', _.isEqual(data, nextData), data, nextData);
		// console.log('worlds', _.isEqual(worldIds, nextWorldIds), worldIds, nextWorldIds);
		// console.log('lang', _.isEqual(currentLang, nextCurrentLang), currentLang.slug, nextCurrentLang.slug);
		
		const shouldUpdate = !_.isEqual(worldIds, nextWorldIds) 
			|| !_.isEqual(currentLang, nextCurrentLang)
			|| !_.isEqual(data.loading, nextData.loading);
		
		// console.log('shouldUpdate', shouldUpdate);
		
		return shouldUpdate;
	}
	
	render() {
		const { data, currentLang } = this.props;
		const { worlds, loading } = data;

		if (loading) { return <Loading />; }

		return (
			<div className="row worlds">
				{_.map(['na', 'eu'], region => (
					<div key={region} className="col-lg">
						{/* <h1 className="region-title">{region}</h1> */}
						<RegionWorlds worlds={worlds} currentLang={currentLang} region={region} />
					</div>
				))}
			</div>
		);
	}
}

const WorldsWithData = graphql(WorldsQuery, {
	options: ({ worldIds }) => ({ 
		shouldBatch: true,
		variables: {
			ids: worldIds,
		},
	}),
})(Worlds);


const RegionWorlds = ({ worlds, currentLang, region }) => (
	_.chain(worlds)
		.filter({ region })
		.sortBy('id')
		.groupBy('lang')
		.map((langWorlds, worldsLangSlug) => (
			<section key={worldsLangSlug} className="region-worlds">
				{/* <h4 className="card-title lang-title">{worldsLangSlug} <small className="text-muted">{region}</small></h4> */}
				<LangWorldsWithData langWorlds={langWorlds} region={region} currentLang={currentLang} worldsLangSlug={worldsLangSlug} />
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
const LangWorlds = ({ data, langWorlds, currentLang, region }) => {
	const { lang, loading } = data;

	if (loading) { return <Loading />; }

	return (
		<div>
			<h5 className="worlds-lang">{lang.name} <small className="text-muted">{region}</small></h5>
			<ul className="list-unstyled lang-worlds">
				{_.chain(langWorlds)
					.sortBy(world => {
						return _.get(world, [currentLang.slug, 'name']);
					})
					.map(world => {
						const langWorld = _.get(world, [currentLang.slug]);

						return <World key={world.id} langWorld={langWorld} currentLang={currentLang} />;
					})
					.value()}
			</ul>
		</div>
	);
};

const LangWorldsWithData = graphql(LangQuery)(LangWorlds, {
	options: (props) => ({
		shouldBatch: true,
		variables: { slug: props.currentLang.slug },
	}),
});

const World = ({  langWorld, currentLang }) => (
	<li className="world">
		<Link to={`/${currentLang.slug}/${langWorld.slug}`}>
			{langWorld.name}
		</Link>
	</li>
);





export default WorldsWithData;

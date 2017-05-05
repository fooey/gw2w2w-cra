import React from 'react';
import { gql, graphql } from 'react-apollo';
import { Route, NavLink, Link, Redirect } from 'react-router-dom'
import _ from 'lodash';



const LangsQuery = gql`
	query { 
		langs { name slug label } 
	}
`;

const Langs = ({ data }) => {
	const { langs, isLoading } = data;
	const DEFAULT_LANG = 'en';

	if (isLoading) { return null; }

	return (
		<ul className="nav nav-tabs">
			<Route exact path="/" render={() => (
				<Redirect to={`/${DEFAULT_LANG}`} />
			)}/>

			<Route exact path="/:langSlug([a-z]{2})/:worldSlug([a-z\-]+)" render={({ match }) => {
				const langSlug = match.params.langSlug;
				const worldSlug = match.params.worldSlug;

				return (
					_.map(langs, lang => <Lang key={lang.slug} lang={lang} langSlug={langSlug} worldSlug={worldSlug} />)
				);
			}}/>
			<Route exact path="/:langSlug([a-z]{2})" render={({ match }) => {
				const langSlug = match.params.langSlug;

				return (
					_.map(langs, lang => <Lang key={lang.slug} lang={lang} langSlug={langSlug}/>)
				);
			}}/>
		</ul>
	)
};

const LangsWithData = graphql(LangsQuery)(Langs);


const Lang = ({ lang, worldSlug }) => {
	const link = _.without([
		'',
		lang.slug,
		worldSlug ? worldSlug : null,
	], null);

	return (
		<li className="nav-item">
			<NavLink to={link.join('/')} title={lang.name} className="nav-link" activeClassName="active">
				{lang.label}
			</NavLink>
		</li>
	);
};

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

	if (isLoading) { return null; }

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

// const MyComponentWithData = graphql(LangsQuery)(App);

const App = () => (
	<div className="App">
		<div className="container">
			<div className="row">
				<div className="col">
					<br />
					<LangsWithData />
				</div>
			</div>

			<Route exact path="/:langSlug([a-z]{2})/:worldSlug([a-z\-]+)" render={({ match }) => (
				<h1>world: {JSON.stringify(match.params)}</h1>
			)}/>
			<Route exact path="/:langSlug([a-z]{2})" render={({ match }) => (
				<Overview langSlug={_.get(match, ['params', 'langSlug'])} />
			)}/>
		</div>
	</div>
);

export default App;

import React from 'react';
import { gql, graphql } from 'react-apollo';
import { Route, NavLink, Redirect } from 'react-router-dom'
import _ from 'lodash';

import Overview from 'src/components/Overview';



const LangsQuery = gql`
	query {
		langs { name slug label }
	}
`;

const Langs = ({ data }) => {
	const { langs, isLoading } = data;
	const DEFAULT_LANG = 'en';

	if (isLoading) { return <span>Loading...</span>; }

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

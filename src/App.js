import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import _ from 'lodash';

import Layout from 'src/components/Layout';
import Overview from 'src/components/Overview';

import 'src/styles/bootstrap.css';
import 'src/styles/app.css';


const DEFAULT_LANG = 'en';

const App = () => (
	<Layout>
		<Route exact path="/" render={() => (
			<Redirect to={`/${DEFAULT_LANG}`} />
		)}/>

		<Route exact path="/:langSlug([a-z]{2})" render={({ match }) => (
			<Overview langSlug={_.get(match, ['params', 'langSlug'])} />
		)}/>

		<Route exact path="/:langSlug([a-z]{2})/:worldSlug([a-z\-]+)" render={({ match }) => (
			<h1>world: {JSON.stringify(match.params)}</h1>
		)}/>
	</Layout>
);

export default App;

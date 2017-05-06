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

		<Route path="/:langSlug([a-z]{2})" render={({ match }) => {
			const langSlug = _.get(match, ['params', 'langSlug'], DEFAULT_LANG);
			window.localStorage.setItem('langSlug', langSlug);
			
			return null;
		}}/>

		<Route exact path="/" render={() => {
			const myLangSlug = window.localStorage.getItem('langSlug') || DEFAULT_LANG;

			return <Redirect to={`/${myLangSlug}`} />;
		}}/>

		<Route exact path="/:langSlug([a-z]{2})" render={({ match }) => {
			return <Overview langSlug={_.get(match, ['params', 'langSlug'])} />;
		}}/>

		<Route exact path="/:langSlug([a-z]{2})/:worldSlug([a-z\-]+)" render={({ match }) => {
			return <h1>world: {JSON.stringify(match.params)}</h1>;
		}}/>
	</Layout>
);

export default App;

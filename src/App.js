import React from 'react';
import { graphql } from 'react-apollo';
import { Route, Redirect } from 'react-router-dom';
import _ from 'lodash';

import Layout from 'src/components/Layout';
import Overview from 'src/components/Overview';
import { Loading } from 'src/components/Util';

import LangQuery from 'src/gql/lang';

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
			return <LangwWithData langSlug={_.get(match, ['params', 'langSlug'])} />;
		}}/>

		<Route exact path="/:langSlug([a-z]{2})/:worldSlug([a-z\-]+)" render={({ match }) => {
			return <h1>world: {JSON.stringify(match.params)}</h1>;
		}}/>

	</Layout>
);


const Lang = ({ data }) => {
	if (data.loading) return <Loading />;

	return (
		<Overview lang={data.lang} />
	);
};

const LangwWithData = graphql(LangQuery, {
	options: ({ langSlug }) => ({
		shouldBatch: true,
		variables: {
			slug: langSlug,
		},
	}),
})(Lang);

export default App;

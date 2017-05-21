import React from 'react';
import { graphql } from 'react-apollo';
import { Route, Redirect } from 'react-router-dom';
import _ from 'lodash';

import Layout from 'src/components/Layout';
import Overview from 'src/components/Overview';
import { Loading } from 'src/components/Util';

import LangQuery from 'src/gql/lang';
import WorldBySlugQuery from 'src/gql/worldBySlug';

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

		<Route path="/:langSlug([a-z]{2})/:worldSlug([a-z\-]+)?" render={({ match }) => {
			const { params } = match;
			const { langSlug, worldSlug } = params;
			console.log({ langSlug, worldSlug });
			
			return (
				<LangWithData langSlug={langSlug}>
					{_.isEmpty(worldSlug) ? 
						<Overview /> : 
						<WorldWithData worldSlug={worldSlug}>
							<Match />
						</WorldWithData>
					}
				</LangWithData>
			);
		}}/>

		{/* <Route exact path="/:langSlug([a-z]{2})/:worldSlug([a-z\-]+)" render={({ match }) => {
			const { params } = match;
			
			console.log('params', params);
			
			return (
				<LangWithData langSlug={_.get(params, 'langSlug')}>
					<WorldWithData worldSlug={_.get(params, 'worldSlug')} />
				</LangWithData>
			);
		}}/> */}

	</Layout>
);


const Lang = ({ data, children }) => {
	if (data.loading) return <Loading />;

	return children && React.cloneElement(children, { lang: data.lang });
};

const LangWithData = graphql(LangQuery, {
	options: ({ langSlug }) => ({
		shouldBatch: true,
		variables: {
			slug: langSlug,
		},
	}),
})(Lang);


const World = ({ lang, data, children }) => {
	if (data.loading) return <Loading />;
	
	return children && React.cloneElement(children, { lang, world: data.world });
};

const WorldWithData = graphql(WorldBySlugQuery, {
	options: ({ worldSlug }) => ({
		shouldBatch: true,
		variables: {
			slug: worldSlug,
		},
	}),
})(World);

const Match = ({ world, lang }) => (
	<div> 		
		<h1>{JSON.stringify(world)}</h1>
		<h2>{JSON.stringify(lang)}</h2>
	</div>
);

export default App;

import React from 'react';
import { graphql } from 'react-apollo';
import { Route, Redirect, Switch } from 'react-router-dom';
import _ from 'lodash';

import Layout from 'src/components/Layout';
import Overview from 'src/components/Overview';
import { Loading, NotFound } from 'src/components/Util';

import GlobalsQuery from 'src/gql/globals';

import 'src/styles/bootstrap.css';
import 'src/styles/app.css';


const DEFAULT_LANG = 'en';


const Routes = () => (
	<Switch>
		<Route exact path="/" component={RedirectFromRoot}/>	
		<Route path="/:langSlug([a-z]{2})/:worldSlug([a-z\-]+)?" component={App}/>		
		<Route component={NotFound} />	
	</Switch>
);


const RedirectFromRoot = () => {
	const myLangSlug = window.localStorage.getItem('langSlug') || DEFAULT_LANG;

	return <Redirect to={`/${myLangSlug}`} />;
};


const App = ({ match }) => {
	const { params } = match;
	const { langSlug, worldSlug } = params;
	
	return <GlobalsWithData langSlug={langSlug} worldSlug={worldSlug} />;
};


const Globals = ({ data, langSlug, worldSlug }) => {
	if (data.loading) return <Loading />;
	
	const { langs, worlds } = data;
	
	const lang = _.isEmpty(langSlug) ? null : _.find(langs, { slug: langSlug });
	const world = _.isEmpty(worldSlug) ? null : _.find(worlds, world => _.includes(world.slugs, worldSlug));
	
	const GLOBALS = { 
		lang, 
		world, 
		langs, 
		worlds,
	};
	
	// save the current lang to local storage
	if (lang) {
		window.localStorage.setItem('langSlug', langSlug); 		
	}
	
	console.log('Globals', { langSlug, worldSlug, GLOBALS });
	
	if (GLOBALS.world && GLOBALS.lang) {
		return (
			<div>
				<h1>{JSON.stringify(lang)}</h1>
				<h2>{JSON.stringify(world)}</h2>
			</div>
		);
	}
	else if (GLOBALS.lang) {
		return (
			<Layout GLOBALS={GLOBALS}>
				<Overview GLOBALS={GLOBALS} routeLang={lang} />
			</Layout>
		);
	}
	else {
		return <NotFound />;
	}
};

const GlobalsWithData = graphql(GlobalsQuery, {
	options:{ shouldBatch: true },
})(Globals);

export default Routes;

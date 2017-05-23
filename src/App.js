import React from 'react';
import { graphql } from 'react-apollo';
import { Route, Redirect, Switch } from 'react-router-dom';
import _ from 'lodash';

import Layout from 'src/components/Layout';
import Overview from 'src/components/Overview';
import Match from 'src/components/Match';
import { Loading, NotFound } from 'src/components/Util';

import GlobalsQuery from 'src/gql/globals';

import 'src/styles/bootstrap.css';
import 'src/styles/app.css';


const DEFAULT_LANG = 'en';


const RedirectFromRoot = () => {
	const myLangSlug = window.localStorage.getItem('langSlug') || DEFAULT_LANG;

	return <Redirect to={`/${myLangSlug}`} />;
};


const App = ({ match }) => {
	const { params } = match;
	const { langSlug, worldSlug } = params;
	
	return <GlobalsWithData langSlug={langSlug} worldSlug={worldSlug} />;
};


const Routes = () => (
	<Switch>
		<Route exact path="/" component={RedirectFromRoot}/>	
		<Route path="/:langSlug([a-z]{2})/:worldSlug([a-z\-]+)?" component={App}/>		
		<Route component={NotFound} />	
	</Switch>
);


const Globals = ({ data, langSlug, worldSlug }) => {
	if (data.loading) return <Loading />;
	
	const { langs, worlds, objectives } = data;
	
	const lang = _.isEmpty(langSlug) ? null : _.find(langs, { slug: langSlug });
	const world = _.isEmpty(worldSlug) ? null : _.find(worlds, world => _.includes(world.slugs, worldSlug));
	
	const GLOBALS = { 
		lang, 
		world, 
		langs, 
		worlds,
		objectives,
	};
	
	if (GLOBALS.lang) {
		window.localStorage.setItem('langSlug', langSlug); // save the current lang to local storage
		
		return (
			<Layout GLOBALS={GLOBALS}>
				{GLOBALS.world ? <Match GLOBALS={GLOBALS} /> : <Overview GLOBALS={GLOBALS} />}
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

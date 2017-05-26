import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Layout from 'src/components/Layout';
import Overview from 'src/components/Overview';
import Match from 'src/components/Match';
import { NotFound } from 'src/components/Util';

import { getLangBySlug } from 'src/lib/lang';
import { getWorldBySlug } from 'src/lib/world';

// import STATIC from 'src/data/static';

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
	
	return <Globals langSlug={langSlug} worldSlug={worldSlug} />;
};


const Routes = () => (
	<Switch>
		<Route exact path="/" component={RedirectFromRoot}/>	
		<Route path="/:langSlug([a-z]{2})/:worldSlug([a-z\-]+)?" component={App}/>		
		<Route component={NotFound} />	
	</Switch>
);


const Globals = ({ langSlug, worldSlug }) => {	
	const lang = getLangBySlug(langSlug);
	const world = getWorldBySlug(worldSlug);
	
	const ROUTE = {
		lang,
		world,
	};
	
	if (lang) {
		window.localStorage.setItem('langSlug', langSlug); // save the current lang to local storage
		
		return (
			<Layout ROUTE={ROUTE}>
				{ROUTE.world ? <Match ROUTE={ROUTE} /> : <Overview ROUTE={ROUTE} />}
			</Layout>
		);
	}
	else {
		return <NotFound />;
	}
};

// const GlobalsWithData = graphql(GlobalsQuery, {
// 	options:{ shouldBatch: true },
// })(Globals);

export default Routes;

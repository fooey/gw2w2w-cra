import React, { Component, PureComponent } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import _ from 'lodash';

import Layout from 'src/components/Layout';
import Overview from 'src/components/Overview';
import Match from 'src/components/Match';
import { NotFound } from 'src/components/Util';

import { getLangBySlug } from 'src/lib/lang';
import { getWorldBySlug } from 'src/lib/world';

import 'src/styles/bootstrap.css';
import 'src/styles/app.css';

import STATIC from 'src/data/static';


const RedirectFromRoot = () => {
	const myLangSlug = window.localStorage.getItem('langSlug') || STATIC.defaultLang;

	return <Redirect to={`/${myLangSlug}`} />;
};


class App extends Component {
	shouldComponentUpdate(nextProps) {
		const params = _.get(this.props, 'match.params');
		const nextParams = _.get(nextProps, 'match.params');
		
		return !_.isEqual(params, nextParams);
	}
	
	render() {
		const { match } = this.props;
		
		const { params } = match;
		const { langSlug, worldSlug } = params;
		
		return <Globals langSlug={langSlug} worldSlug={worldSlug} />;
	}
}


class Routes extends Component {	
	render() {
		return (
			<Switch>
				<Route exact path="/" component={RedirectFromRoot}/>	
				<Route path="/:langSlug([a-z]{2})/:worldSlug([a-z\-]+)?" component={App}/>		
				<Route component={NotFound} />	
			</Switch>
		);
	}
}


class Globals extends PureComponent {	
	render() {
		const { langSlug, worldSlug } = this.props;
		
		const lang = getLangBySlug(langSlug);
		const world = getWorldBySlug(worldSlug);
		
		const ROUTE = {
			lang,
			langSlug,
			world,
			worldSlug,
		};
		
		console.log({ langSlug, lang });
		console.log({ worldSlug, world });
		
		if (lang) {
			window.localStorage.setItem('langSlug', langSlug); // save the current lang to local storage
			
			return (
				<Layout langSlug={langSlug} worldSlug={worldSlug}>
					{ROUTE.world ? 
						<Match ROUTE={ROUTE} /> : 
						<Overview ROUTE={ROUTE} />}
				</Layout>
			);
		}
		else {
			return <NotFound />;
		}
	}
}

// const GlobalsWithData = graphql(GlobalsQuery, {
// 	options:{ shouldBatch: true },
// })(Globals);

export default Routes;

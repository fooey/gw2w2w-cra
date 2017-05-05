import React from 'react';
import { gql, graphql } from 'react-apollo';
import { Route, NavLink, Link, Redirect } from 'react-router-dom'
import _ from 'lodash';

import logo from './logo.svg';
import './App.css';


const LangsQuery = gql`query { langs { name slug label } }`;
const Langs = ({ data }) => {
	const { langs, isLoading } = data;
	const DEFAULT_LANG = 'en';

	if (isLoading) { return null; }

	return (
		<ul className="nav nav-pills">
			<Route exact path="/" render={() => (
				<Redirect to={`/${DEFAULT_LANG}`} />
			)}/>

			<Route path="/:langSlug([a-z]{2})/:worldSlug([a-z\-]+)?" render={() => (
				_.map(langs, lang => <Lang key={lang.slug} lang={lang} />)
			)}/>
		</ul>
	)
};

const LangsWithData = graphql(LangsQuery)(Langs);

const Lang = ({ lang }) => (
	<li className="nav-item">
		<NavLink to={`/${lang.slug}`} title={lang.name} className="nav-link" activeClassName="active">
			{lang.label}
		</NavLink>
	</li>
);

// const MyComponentWithData = graphql(LangsQuery)(App);

const App = () => (
	<div className="App">
		<div className="App-header">
			<Link to="/"><img src={logo} className="App-logo" alt="logo"/></Link>
			<h2>Welcome</h2>
		</div>
		<div className="container">
			<div className="row">
				<div className="col">
					<div className="card">
						<p className="App-intro">
							To get started, edit
							<code>src/App.js</code>
							and save to reload.
						</p>
					</div>
				</div>
				<div className="col">
					<div className="card">
						<LangsWithData />
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default App;

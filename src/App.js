import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { map } from 'lodash';

import logo from './logo.svg';
import './App.css';

class App extends Component {
	render() {
		const { data } = this.props;
		const { langs, isLoading } = data;

		console.log('data', data);

		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
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
								<ul className="nav flex-column">
									{isLoading ? null : map(langs, lang => (
										<li key={lang.slug} className="nav-item">
											<a className="nav-link" href={`/${lang.slug}`}>{lang.name}</a>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const MyQuery = gql`query { langs { name slug label } }`;
const MyComponentWithData = graphql(MyQuery)(App);

export default MyComponentWithData;

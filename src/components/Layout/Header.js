import React from 'react';
import { graphql } from 'react-apollo';
import { Route, NavLink } from 'react-router-dom'
import _ from 'lodash';

import { Loading } from 'src/components/Util';

import LangQuery from 'src/gql/lang';

const SLUGS = ['en','fr','de','es','zh'];


const Langs = () => {
	return (
		<div className="container">
			<div className="row">
				<div className="col">
					<br />

					<ul className="nav nav-tabs">

						<Route exact path="/:langSlug([a-z]{2})/:worldSlug([a-z\-]+)" render={({ match }) => {
							const {
								// langSlug,
								worldSlug,
							} = match.params;

							return _.map(SLUGS, slug => <LangWithData key={slug} slug={slug} worldSlug={worldSlug} />);
						}}/>

						<Route exact path="/:langSlug([a-z]{2})" render={({ match }) => {
							// const { langSlug } = match.params;

							return _.map(SLUGS, slug => <LangWithData key={slug} slug={slug}/>);
						}}/>

					</ul>

					<br />
				</div>
			</div>
		</div>
	)
};

const Lang = ({ data, slug, worldSlug }) => {
	const { lang, loading } = data;

	if (loading) { return <Loading />; }

	const link = _.without([
		'',
		lang.slug,
		worldSlug ? worldSlug : null,
	], null);

	return (
		<li className="nav-item">
			<NavLink to={link.join('/')} title={lang.name} className="nav-link" activeClassName="active">
				{lang.label}
			</NavLink>
		</li>
	);
};

const LangWithData = graphql(LangQuery, {
	options: (props) => ({
		shouldBatch: true,
	})
})(Lang);

export default Langs;

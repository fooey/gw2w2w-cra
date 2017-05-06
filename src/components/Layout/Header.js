import React from 'react';
import { gql, graphql } from 'react-apollo';
import { Route, NavLink } from 'react-router-dom'
import _ from 'lodash';

import { Loading } from 'src/components/Util';


const LangsQuery = gql`
	query {
		langs { name slug label }
	}
`;

const Langs = ({ data }) => {
	const { langs, isLoading } = data;

	if (isLoading) { return <Loading />; }

	return (
		<ul className="nav nav-tabs">

			<Route exact path="/:langSlug([a-z]{2})/:worldSlug([a-z\-]+)" render={({ match }) => {
				const { langSlug, worldSlug } = match.params;

				return (
					_.map(langs, lang => <Lang key={lang.slug} lang={lang} langSlug={langSlug} worldSlug={worldSlug} />)
				);
			}}/>

			<Route exact path="/:langSlug([a-z]{2})" render={({ match }) => {
				const { langSlug } = match.params;

				return (
					_.map(langs, lang => <Lang key={lang.slug} lang={lang} langSlug={langSlug}/>)
				);
			}}/>

		</ul>
	)
};


const Lang = ({ lang, worldSlug }) => {
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


const LangsWithData = graphql(LangsQuery)(Langs, { options: { shouldBatch: true } });

export default LangsWithData;

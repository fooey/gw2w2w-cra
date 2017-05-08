import React from 'react';
import { gql, graphql } from 'react-apollo';
import { Route, NavLink } from 'react-router-dom'
import _ from 'lodash';

import { Loading } from 'src/components/Util';


const SLUGS = ['en','fr','de','es','zh'];

// const LangsQuery = gql`
// 	query {
// 		langs { slug }
// 	}
// `;

const Langs = () => {
	return (
		<ul className="nav nav-tabs">

			<Route exact path="/:langSlug([a-z]{2})/:worldSlug([a-z\-]+)" render={({ match }) => {
				const {
					// langSlug,
					worldSlug,
				 } = match.params;

				return (
					_.map(SLUGS, slug => <LangWithData key={slug} slug={slug} worldSlug={worldSlug} />)
				);
			}}/>

			<Route exact path="/:langSlug([a-z]{2})" render={({ match }) => {
				// const { langSlug } = match.params;

				return (
					_.map(SLUGS, slug => <LangWithData key={slug} slug={slug}/>)
				);
			}}/>

		</ul>
	)
};


const LangQuery = gql`
	query lang($slug: ID!) {
		lang(slug: $slug) {
			name
			slug
			label
		}
	}
`;
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
const LangWithData = graphql(LangQuery)(Lang, {
	options: (props) => ({
		shouldBatch: true,
		variables: {
			slug: props.slug
		}
	})
});


// const LangsWithData = graphql(LangsQuery)(Langs, { options: { shouldBatch: true } });

export default Langs;

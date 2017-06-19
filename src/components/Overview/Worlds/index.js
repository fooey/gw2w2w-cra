import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import Card from 'src/components/Layout/Card';

import { getLangBySlug } from 'src/lib/lang';

import STATIC from 'src/data/static';

class Worlds extends PureComponent {
	render() {
		const { langSlug } = this.props;

		return (
			<div className="worlds">
				{_.map(['na', 'eu'], regionSlug => (
					<RegionWorlds
						key={regionSlug}
						regionWorlds={STATIC.worldsByRegion[regionSlug]}
						langSlug={langSlug}
						regionSlug={regionSlug}
					/>
				))}
			</div>
		);
	}
}

// function getRegionWorlds(region) {
// 	return _.chain(STATIC.worldsByRegion)
// 		.get(region)
// 		// .sortBy('id')
// 		.groupBy('lang')
// 		.value();
// }

function getWorldsByLang(worlds) {
	return _.groupBy(worlds, 'lang');
}

class RegionWorlds extends PureComponent {
	render() {
		const { langSlug, regionWorlds, regionSlug } = this.props;
		const worldsByLang = getWorldsByLang(regionWorlds);

		return (
			<div className="worlds-regions">{
				_.map(worldsByLang, (langWorlds, regionLangSlug) => {
					const lang = getLangBySlug(regionLangSlug);

					return (
						<section key={regionLangSlug} className="region-worlds">
							<Card title={lang.name} subtitle={regionSlug}>
								<LangWorlds
									langWorlds={langWorlds}
									langSlug={langSlug}
								/>
							</Card>
						</section>
					);
				})
			}</div>
		);
	}
}

class LangWorlds extends PureComponent {
	render() {
		const { langWorlds, langSlug } = this.props;

		return (
			<ul className="list-unstyled overview-lang-worlds">
				{_.chain(langWorlds)
					.sortBy(world => {
						return _.get(world, [langSlug, 'name']);
					})
					.map(world => {
						const langWorld = _.get(world, [langSlug]);

						return <World key={world.id} langWorld={langWorld} langSlug={langSlug} />;
					})
					.value()}
			</ul>
		);
	}
}

class World extends PureComponent {
	render() {
		const { langWorld, langSlug } = this.props;

		return (
			<li className="overview-world">
				<Link to={`/${langSlug}/${langWorld.slug}`}>
					<i className="fa fa-caret-right" aria-hidden="true"></i>
					<span>{langWorld.name}</span>
				</Link>
			</li>
		);
	}
}


export default Worlds;

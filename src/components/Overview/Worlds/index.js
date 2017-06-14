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
				{_.map(['na', 'eu'], region => (
					<RegionWorlds
						key={region}
						region={region}
						langSlug={langSlug}
					/>
				))}
			</div>
		);
	}
}

class RegionWorlds extends PureComponent {
	render() {
		const { langSlug, region } = this.props;

		return (
			<div>{
				_.chain(STATIC.worlds)
				.filter({ region })
				.sortBy('id')
				.groupBy('lang')
				.map((langWorlds, regionLangSlug) => {
					const lang = getLangBySlug(regionLangSlug);

					return (
						<section key={regionLangSlug} className="region-worlds">
							<Card title={lang.name} subtitle={region}>
								<LangWorlds
									langWorlds={langWorlds}
									langSlug={langSlug}
								/>
							</Card>
						</section>
					);
				})
				.value()
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
					{langWorld.name}
				</Link>
			</li>
		);
	}
}


export default Worlds;

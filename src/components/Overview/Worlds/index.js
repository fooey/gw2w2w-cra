import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { getLangBySlug } from 'src/lib/lang';

import STATIC from 'src/data/static';

class Worlds extends PureComponent {
	render() {
		const { langSlug } = this.props;

		return (
			<div className="row worlds">
				{_.map(['na', 'eu'], region => (
					<div key={region} className="col-lg">
						{/* <h1 className="region-title">{region}</h1> */}
						<RegionWorlds
							region={region}
							langSlug={langSlug}
						/>
					</div>
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
					const lang = getLangBySlug(langSlug);

					return (
						<section key={regionLangSlug} className="region-worlds">
							<h4 className="card-title lang-title">{lang.name} <small className="text-muted">{region}</small></h4>
							<LangWorlds
								langWorlds={langWorlds}
								langSlug={langSlug}
							/>
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
			<ul className="list-unstyled lang-worlds">
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
			<li className="world">
				<Link to={`/${langSlug}/${langWorld.slug}`}>
					{langWorld.name}
				</Link>
			</li>
		);
	}
}


export default Worlds;

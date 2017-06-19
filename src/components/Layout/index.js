import React, { PureComponent } from 'react';

import Header from './Header';
import Card from 'src/components/Layout/Card';

class Layout extends PureComponent {
	render() {
		const { children, langSlug, worldSlug } = this.props;

		return (

			<div className="layout">
				<Header langSlug={langSlug} worldSlug={worldSlug} />
				<div>
					{ children }
				</div>
				<footer>
					<Card>
						asdf
					</Card>
				</footer>
			</div>
		);
	}
}

export default Layout;

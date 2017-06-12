import React, { PureComponent } from 'react';

import Header from './Header';

class Layout extends PureComponent {
	render() {
		const { children, langSlug, worldSlug } = this.props;

		return (

			<div className="layout">
				<Header langSlug={langSlug} worldSlug={worldSlug} />
				<div className="content">
					{ children }
				</div>
				<footer>
					asdf
				</footer>
			</div>
		);
	}
}

export default Layout;

import React, { PureComponent } from 'react';

import Header from './Header';

class Layout extends PureComponent {
	render() {
		const { children, langSlug, worldSlug } = this.props;
		
		return (

			<div className="layout">
				<Header langSlug={langSlug} worldSlug={worldSlug} />

				{/* <div className="row">
					<div className="col text-center">
						<a href="/"><img src={logo} alt="logo" height="128" /></a>
					</div>
				</div> */}

				{ children }
			</div>
		);
	}
}

export default Layout;

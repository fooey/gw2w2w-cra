import React from 'react';

import Header from './Header';

const Layout = ({ children }) => (
	<div className="container">
		<div className="row">
			<div className="col">
				<br />
				<Header />
			</div>
		</div>

		{ children }
	</div>
)

export default Layout;

import React from 'react';

import Header from './Header';
// import logo from 'src/img/logo/logo-512x192.png';

const Layout = ({ children }) => (

	<div className="layout">
		<Header />

		{/* <div className="row">
			<div className="col text-center">
				<a href="/"><img src={logo} alt="logo" width="512" height="192" /></a>
			</div>
		</div> */}

		{ children }
	</div>
)

export default Layout;

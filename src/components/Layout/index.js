import React from 'react';

import Header from './Header';

import logo from 'src/img/logo/logo-512x192.png';

const Layout = ({ children }) => (
	<div className="container">
		<div className="row">
			<div className="col">
				<br />
				<Header />
			</div>
		</div>

		<div className="row">
			<div className="col text-center">
				<a href="/"><img src={logo} alt="logo" width="512" height="192" /></a>
			</div>
		</div>
		<div className="row">
			<div className="col text-center">
				<button type="button" className="btn btn-primary">primary</button>
				<button type="button" className="btn btn-secondary">secondary</button>
				<button type="button" className="btn btn-success">success</button>
				<button type="button" className="btn btn-warning">warning</button>
				<button type="button" className="btn btn-danger">danger</button>
				<button type="button" className="btn btn-link">link</button>
			</div>
		</div>

		{ children }
	</div>
)

export default Layout;

import React from 'react';
import { Link } from 'react-router-dom';

export const Loading = () => <i className="fa fa-refresh fa-spin fa-fw"></i>;

export const NotFound = ({ location }) => (
	<div className="container">
		<div className="row">
			<div className="col">
				<br />
				<div className="alert alert-danger">
					<h1 className="alert-heading">Not found: <code>{location.pathname}</code></h1>
					<p>Return to <Link to="/">home page</Link></p>
				</div>
			</div>
		</div>
	</div>
);

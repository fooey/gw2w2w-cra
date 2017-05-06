import React from 'react';

import WorldsWithData from './Worlds';


const Overview = ({ langSlug }) => {
	return (
		<div className="row">
			<div className="col">
				<WorldsWithData langSlug={langSlug} />
			</div>
		</div>
	);
}

export default Overview;

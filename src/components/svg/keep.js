import React from 'react';

export default (props) => {
	const {
		fillColor = "#000000",
		...svgProps
	} = props;

	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 512 512" {...svgProps}>
			<path fill={fillColor} d="M144 496h-80v-48h16v-288s-32-48-32-96v-48h80v64h32v-64h80v64h32v-64h80v64h32v-64h80v48c0 48-32 96-32 96v288h16v48h-80c0-256-224-256-224 0z" />
		</svg>
	);
};

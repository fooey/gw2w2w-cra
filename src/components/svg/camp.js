import React from 'react';

export default (props) => {
	const {
		fillColor = "#000000",
		...svgProps
	} = props;

	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...svgProps}>
			<g>
				<path fill={fillColor} d="M256 304s-32 112-144 112h-80s80-144 48-208c0 0 144-32 176-128 32 96 176 128 176 128-32 64 48 208 48 208h-96c-80 0-128-112-128-112z"/>
				<path fill="#fff" d="M144 240h32v48h-32z"/>
				<path fill="#fff" d="M336 240h32v48h-32z"/>
			</g>
		</svg>
	);
};

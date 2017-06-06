import React from 'react';

export default (props) => {
	const {
		fillColor = "#000000",
		...svgProps
	} = props;

	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 512 512" {...svgProps}>
			<g fill={fillColor}>
				<path d="M144 496h-80v-48h16v-256h352v256h16v48h-80c0-256-224-256-224 0z"/>
				<path d="M256 16c-64 128-128 160-224 64l48 96h352l48-96c-96 96-160 64-224-64z"/>
			</g>
		</svg>
	);
};

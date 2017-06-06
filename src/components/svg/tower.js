import React from 'react';

export default (props) => {
	const {
		fillColor = "#000000",
		...svgProps
	} = props;

	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...svgProps}>
			<g>
				<path fill={fillColor} d="M208 496h-80v-48h16v-192s-32-48-32-96v-48c0-64 16-96 144-112 128 16 144 48 144 112v48c0 48-32 96-32 96v192h16v48h-80c.676-168.335-95.329-168.152-96 0z"/>
				<path fill="#fff" d="M256.511 104a16.511 56.331 0 1 1-33.021 0 16.511 56.331 0 1 1 33.021 0z" transform="matrix(2.483 0 0 1.528 -340.091 -24.821)" />
				<path fill="#fff" d="M256 104a16 45.857 0 1 1-32 0 16 45.857 0 1 1 32 0z" transform="matrix(1.552 0 0 1.528 -14.647 -24.821)" />
				<path fill="#fff" d="M256 104a16 45.751 0 1 1-32 0 16 45.751 0 1 1 32 0z" transform="matrix(1.552 0 0 1.528 -215.83 -24.983)" />
			</g>
		</svg>
	);
};

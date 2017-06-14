import React from 'react';
import classnames from 'classnames';

export default ({ children, level = 1, className, title, subtitle }) => {
	const cardClassNames = classnames(className, {
		card: true,
		[`level-${level}`]: true,
	});

	return (
		<div className={cardClassNames}>
			{title ? <CardTitle title={title} subtitle={subtitle} /> : null}
			<div className="card-content">
				{children}
			</div>
		</div>
	);
};

const CardTitle = ({ title, subtitle }) => (
	<h1 className="card-title">
		{title}
		{subtitle ? <span className="card-subtitle">{subtitle}</span> : null}
	</h1>
);

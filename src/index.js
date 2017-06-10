import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, createBatchingNetworkInterface , ApolloProvider } from 'react-apollo';

import App from './App';

const networkInterface = createBatchingNetworkInterface ({
	uri: 'https://graphql.gw2w2w.com/graphql',
	// uri: 'http://localhost:4000/graphql',
	batchInterval: 1, // only batch same tick
});
const client = new ApolloClient({ networkInterface });


// if (process.env.NODE_ENV !== 'production') {
// 	const { whyDidYouUpdate } = require('why-did-you-update');
// 	whyDidYouUpdate(React, {
// 		exclude: [
// 			/.*Apollo.*/gi,
// 			/.*fetchMore.*/gi,
// 			/.*refetch.*/gi,
// 			/.*startPolling.*/gi,
// 			/.*stopPolling.*/gi,
// 			/.*subscribeToMore.*/gi,
// 			/.*updateQuery.*/gi,
// 		],
// 	});
// }

ReactDOM.render(
	<ApolloProvider client={client}>
		<Router>
			<App />
		</Router>
	</ApolloProvider>,
	document.getElementById('root')
);

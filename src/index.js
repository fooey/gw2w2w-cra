import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, createBatchingNetworkInterface , ApolloProvider } from 'react-apollo';

import App from './App';

const networkInterface = createBatchingNetworkInterface ({
	uri: 'https://graphql.gw2w2w.com/graphql',
	batchInterval: 1,
});
const client = new ApolloClient({ networkInterface });



ReactDOM.render(
	<ApolloProvider client={client}>
		<Router>
			<App />
		</Router>
	</ApolloProvider>,
	document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, createBatchingNetworkInterface , ApolloProvider } from 'react-apollo';

const networkInterface = createBatchingNetworkInterface ({
	uri: 'http://localhost:4000/graphql',
	batchInterval: 1,
});
const client = new ApolloClient({ networkInterface });


import App from './App';

ReactDOM.render(
	<ApolloProvider client={client}>
		<Router>
			<App />
		</Router>
	</ApolloProvider>,
	document.getElementById('root')
);

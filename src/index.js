import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';

const networkInterface = createNetworkInterface({ uri: 'http://localhost:4000/graphql' });
const client = new ApolloClient({ networkInterface });


import App from './App';

import './index.css';
import 'src/styles/bootstrap.css';
import 'src/styles/app.css';

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <App />
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
);

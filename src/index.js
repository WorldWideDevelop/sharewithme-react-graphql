import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import './styles/index.css';
// importing the reequired dependencies from the installed packages 
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// connect ApolloClient instance with the GraphQL API 
const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
});

// instantiate ApolloClient 
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

ReactDOM.render(
    <ApolloProvider>
        <App />
    </ApolloProvider>,
    document.getElementById('root'));
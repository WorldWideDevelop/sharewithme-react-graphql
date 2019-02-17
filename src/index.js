import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import './Styles/index.css';
// importing the reequired dependencies from the installed packages 
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AUTH_TOKEN } from './constants';
import { setContext } from 'apollo-link-context'

// connect ApolloClient instance with the GraphQL API 
const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN)
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

// instantiate ApolloClient 
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root'));
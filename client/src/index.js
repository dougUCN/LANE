import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  useQuery,
  gql
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql/'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const container = document.getElementById('root')
const root = createRoot(container);
root.render(
      <ApolloProvider client={client}>
         <App />
      </ApolloProvider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Test query to make sure connection with graphql endpoint works
// client
//   .query({
//     query: gql`
//       query{
//         listHistograms
//       }
//     `
//   })
//   .then(result => console.log(result));

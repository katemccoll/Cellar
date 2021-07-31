import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from './pages/Home';
import SignIn from "./pages/SignIn";
import AddWine from "./pages/AddWine";
import ViewWine from "./pages/ViewWine";
import Search from "./pages/Search";

import Navbar from "./components/Navbar/Navbar";

import './App.css';


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
      <ApolloProvider client={client}>
        <Router>
          <Navbar />
          <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path='/add-wine' component={AddWine}></Route>
            <Route path='/view-wine'  component={ViewWine}></Route>
            <Route path='/search' component={Search}></Route>
            <Route path='/sign-in' component={SignIn}></Route>
          </Switch>

        </Router>

      </ApolloProvider>
  );
}

export default App;

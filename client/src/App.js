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
import FormSignup from "./pages/FormSignup";
import FormWine from "./pages/FormWine";
import Collection from "./pages/Collection";
import Navbar from "./components/Navbar/Navbar";
import SingleWine from "./pages/SingleWine";
import './App.css';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_DEV_GRAPHQL_API || '/graphql',
});


const authLink = setContext((_, { headers }) => {

  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
      <ApolloProvider client={client}>
        <Router>
          <Navbar />
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/add-wine' component={FormWine}/>
            <Route path='/collection'  component={() => <Collection client={client}/>}/>
            <Route path='/login' component={FormSignup}/>
            <Route exact path="/wines/:wineId">
              <SingleWine />
            </Route>
          </Switch>

        </Router>

      </ApolloProvider>
  );
}

export default App;

import React from 'react';
import './App.css';
import Home from '../Home/Home';
import Redirect from '../Redirect/Redirect';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
        <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}>
          </Route>
          <Route exact path="/redirect">
            <Redirect />
          </Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;

import React from 'react';
import './App.css';
import Home from '../Home/Home';
import Redirect from '../Redirect/Redirect';
import MusicList from '../MusicList/MusicList'
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
          <Route exact path="/list">
            <MusicList/>
          </Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;

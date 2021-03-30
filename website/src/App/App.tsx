import React from 'react';
import './App.css';
import Home from '../Home/Home';
import Redirect from '../Redirect/Redirect';
import MusicList from '../MusicList/MusicList'
import Test from '../MusicList/Test'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeLoggedIn from "../Home/HomeLoggedIn";

function App() {
  return (
        <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}>
          </Route>
          <Route path="/redirect">
            <Redirect />
          </Route>
            <Route path="/game">
                <Test/>
            </Route>
          <Route path="/list">
            <MusicList/>
          </Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;

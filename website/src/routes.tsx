import React from "react";
import Home from './Home/Home';
import Redirect from './Redirect/Redirect';
import MusicList from './MusicList/MusicList'
import Test from './MusicList/Test'
const routes = {
    "/": () => <Home />,
    "/redirect": () => <Redirect />,
    "/list": () => <MusicList />,
    "/game": () => <Test/>
};
export default routes;
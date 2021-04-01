import React from 'react';
import './App.css';
import { useRoutes } from "hookrouter";
import routes from "../routes";
import NoPageFound from "../NoPageFound/NoPageFound";

function App() {
    const routeResult = useRoutes(routes);
  return (
      <div>{routeResult || <NoPageFound />}</div>
  );
}

export default App;

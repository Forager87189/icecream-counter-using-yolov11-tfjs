import React from "react";
import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
import "./style/App.css";
import Router from "./components/Router"

const App = () => {
  return (
    <Router />
  );
};

export default App;

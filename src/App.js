import React from "react";
import { Router } from "@reach/router";
import InfoPage from "./InfoPage";
import 'antd/dist/antd.css';
import ReactDOM from "react-dom";
import HomePage from "/HomePage";
import AboutMe from "./AboutMe";
import NotesPage from "./NotesPage";


class App extends React.Component {
  render() {
    return (
      <Router>
        <HomePage path="/" />
        <InfoPage path="infopage/:symbol" />
        <NotesPage path="notes/:symbol" />
        <AboutMe path="aboutme" />
      </Router>
    )
  }
} 

ReactDOM.render(React.createElement(App), document.getElementById("root"));
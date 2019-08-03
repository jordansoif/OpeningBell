import React from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import { Router } from "@reach/router";
import InfoPage from "./InfoPage";

class TargetPractice extends React.Component {
  render() {
    return (
      <div>
        <p>Target Acquired</p>
        <h1>{this.props.id}</h1>
      </div>
    );
  }
}

export default TargetPractice;

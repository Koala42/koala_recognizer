import "./App.css";
import React, { Component } from "react";
import Dropzone from "./dropzone/index";

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="myContainer">
          <Dropzone></Dropzone>

          <div id="result"></div>
        </div>
      </div>
    );
  }
}

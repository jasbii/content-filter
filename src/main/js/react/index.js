import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <App
    instance={document.getElementById("root").getAttribute("data-instance")}
    version={document.getElementById("root").getAttribute("data-version")}
  />,
  document.getElementById("root")
);

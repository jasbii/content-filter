import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <App instance={document.getElementById("root").getAttribute("data-instance")} />,
  document.getElementById("root")
);

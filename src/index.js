import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";
// import 'antd-mobile/dist/antd-mobile.min.css';
import "@material-tailwind/react/tailwind.css";
import "./styles/tailwind.css";

import App from "./app";

const Index = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));

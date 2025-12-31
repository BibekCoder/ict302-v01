import React, { StrictMode } from "react";
import {strictMode} from "react";
import {createRoot} from "react-dom/client";
import ReactDOM from "react-dom/client";
import "./styles.css";
import App from "./app.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

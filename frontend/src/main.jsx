import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import App from "./app.jsx";
import { BrowserRouter } from "react-router-dom"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);

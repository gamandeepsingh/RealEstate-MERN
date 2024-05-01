import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {Auth0Provider} from "@auth0/auth0-react";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-k0qx6sthq8f1zi4a.us.auth0.com"
    clientId="cy8cjajQPvjhKbmEtMp5IadpQA6Id0cQ"
    authorizationParams={{
      redirect_uri:"http://localhost:5173"
    }}
    audience="http://localhost:8000"
    scope = "openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

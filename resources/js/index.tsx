import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import 'leaflet/dist/leaflet.css'
import "./i18n/i18nconfig";

if (document.getElementById('app')) {
    ReactDOM.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
        , document.getElementById('app')
    );
}

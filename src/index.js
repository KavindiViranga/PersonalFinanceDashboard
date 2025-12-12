import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js"; // make sure this matches your App.js
import "./styles.css"; // optional but needed if using custom CSS

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

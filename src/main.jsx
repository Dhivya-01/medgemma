import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import LoadingOverlay from "./components/LoadingOverlay.jsx";
import "./index.css";
import App from "./App.jsx";
import { store } from "./redux/store.js";
import { appConfig } from "./config/app.config.js";
import UserProvider from "./Context/UserProvider.jsx";
import "./i18n.js"

// To Set Document Title
document.title = appConfig.name;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <UserProvider>
          <Suspense fallback={<LoadingOverlay />}>
            <App />
          </Suspense>
        </UserProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

import "./style.css";
import Proutes from "./components/routes";
// import Signup from "./pages/signup";
// import Login from "./pages/login";

const root = createRoot(document.querySelector("#root"));

root.render(
    <Provider store={store}>
    <Proutes/>
    </Provider>
    
  
);

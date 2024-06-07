import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

import "./style.css";
import Proutes from "./components/routes";
// import Signup from "./pages/signup";
// import Login from "./pages/login";

const root = createRoot(document.querySelector("#root"));

root.render(
   <React.StrictMode>
    <Proutes/>
   </React.StrictMode>
    
  
);

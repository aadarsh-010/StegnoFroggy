import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "../pages/signup";
import Login from "../pages/login";
import Home from "../pages/home";
import Steganography from "../pages/stagt2p";
import Stag2 from "../pages/stagp2t";
import FeedbackForm from "../pages/feedback";
import SearchBar from "./search";

export default function Proutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/stagt" element={<Steganography />}></Route>
        <Route path="/stagp" element={<Stag2 />}></Route>
        <Route path="/feedback" element={<FeedbackForm/>}></Route>
        <Route path="/search" element={<SearchBar/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

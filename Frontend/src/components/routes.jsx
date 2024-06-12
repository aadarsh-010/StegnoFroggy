import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import Signup from "../pages/signup";
import Login from "../pages/login";
import Home from "../pages/home";
import Steganography from "../pages/stagt2p";
import Stag2 from "../pages/stagp2t";
import FeedbackForm from "../pages/feedback";
import SearchBar from "./search";

export default function Proutes() {

  const [logged_user_data, chng] = useState({});
  const [flag, Cod] = useState(false);

  const fetchuser = async () => {
    try {
      const userdata = await fetch("http://localhost:5000/usercokkie", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await userdata.json();
      //  if we didnt get the data so the function is goto catch(err) and eroro will be shown iske neehce ka console bhi print nhi hoga
      Cod(true);
      chng(data);
      console.log("data came -" + data.username);
    } catch (err) {
      Cod(false);
      console.log(data + " user login nhi hai");
    }
  };

  useEffect(() => {
    console.log("fetchuser");
    fetchuser();
  }, []);

  return (
    <BrowserRouter>
    <Navbar usercame={flag}/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/stagt" element={<Steganography logged_user={logged_user_data}/>}></Route>
        <Route path="/stagp" element={<Stag2 />}></Route>
        <Route path="/feedback" element={<FeedbackForm/>}></Route>
        <Route path="/search" element={<SearchBar/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

import React from "react";
import { Canvas } from "@react-three/fiber";
// import "bootstrap/dist/css/bootstrap.min.css";

import PNavbar from "../components/navbar.jsx";
import Splinemodel from "../components/spline.jsx";
import "../style.css";
import About from "../components/about.jsx";

export default function Home() {
  return (
    <>
      <PNavbar />
      <div className="homepage">
        <Splinemodel />
      </div>
      <h1 style={{textAlign:"center"}}>lets explore what stag do?</h1>
      <About/>
    </>
  );
}

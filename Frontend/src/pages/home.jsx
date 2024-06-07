import React from "react";
import { Canvas } from "@react-three/fiber";
// import "bootstrap/dist/css/bootstrap.min.css";

import PNavbar from "../components/navbar.jsx";
import Splinemodel from "../components/spline.jsx";
import "../style.css";

export default function Home() {
  return (
    <>
      <PNavbar />
      <div className="homepage">
        <Splinemodel />
        <div className="intro">"Do you want to send a secret msg"</div>
      </div>
    </>
  );
}

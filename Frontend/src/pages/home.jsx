import React from "react";
import { Canvas } from "@react-three/fiber";
import "bootstrap/dist/css/bootstrap.min.css";

import Pigeon3D from "../components/pigeon3D.jsx";
import PNavbar from "../components/navbar.jsx";
import Intro from "../components/intro.jsx";

export default function Home() {
  return (
    <>
      <PNavbar />
      <div className="homepage">
        {/* <div className="pcanvas">
          <Canvas
          shadows
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [-4, 3, 6],
          }}
          className=""
        >
          <Pigeon3D />
        </Canvas>
        </div> */}
        <div className="intro">
          <Intro msg="Do you want to send a secret msg" />
        </div>
      </div>
    </>
  );
}

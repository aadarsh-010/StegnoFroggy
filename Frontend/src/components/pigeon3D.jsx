import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

import Model from "./model";

export default function Pigeon3D() {
  return (
    <>
      {/* <OrbitControls makeDefault /> */}

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
       <mesh receiveShadow position-x={6} position-z={-1} rotation-x={-Math.PI * 0.5} scale={5.5}>
        <planeGeometry />
        <meshStandardMaterial color="lightgreen" />
      </mesh> 

      <Suspense>
        <Model />
      </Suspense>
      {/* suspense-> so that everything else is loaded if this taking time and fallback adds something if model is not loaded. */}
    </>
  );
}

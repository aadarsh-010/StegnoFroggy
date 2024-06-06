import React, { Suspense, useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import useMousePosition from "./mousemov";

export default function Model() {
  const model = useGLTF("./scene.gltf");
  const animation = useAnimations(model.animations, model.scene);
  const { x, y } = useMousePosition(); // Use the custom hook to get mouse position

  // Define the range for x and y positions
  const minX = -1.5;
  const maxX = 1.5;
  const minY = -1.5;
  const maxY = 1.5;

  // Ref to store the current position of the model
  const currentPosition = useRef({ x: 0, y: 0 });

  // Function to clamp the values within a range
  const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

  // Function for linear interpolation
  const lerp = (start, end, t) => start * (1 - t) + end * t;

  // Animate the model's position
  useEffect(() => {
    const animate = () => {
      const targetX = x ? clamp(-(x - window.innerWidth / 2) / 100, minX, maxX) : 0;
      const targetY = y ? clamp(-(window.innerHeight / 2 - y) / 100, minY, maxY) : 0;

      // Linearly interpolate towards the target position
      currentPosition.current.x = lerp(currentPosition.current.x, targetX, 0.1);
      currentPosition.current.y = lerp(currentPosition.current.y, targetY, 0.1);

      // Request the next frame
      requestAnimationFrame(animate);
    };

    animate();
  }, [x, y]);

  useEffect(() => {
    const action = animation.actions.Object_0;
    action.play();
  }, [animation.actions]);

  return (
    <Suspense fallback={null}>      
      <primitive
        object={model.scene}
        scale={4.5}
        position-x={currentPosition.current.x} // Use lerped x value
        position-y={currentPosition.current.y} // Use lerped y value
        rotation-y={Math.PI * 0.5}
      />
    </Suspense>
  );
}

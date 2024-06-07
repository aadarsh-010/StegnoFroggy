import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Splinemodel() {
  return (
    <main style={{width:1000 , height:200, marginTop:0}}>
      <Spline
        scene="https://prod.spline.design/vRljTMV34XAZpo8x/scene.splinecode" 
      />
    </main>
  );
}
import React from "react";
import "./CSS/about.css";
import { Fade } from "react-awesome-reveal";

export default function About() {
  return (
    <>
       <div className="section">
        <div className="container" >
          <Fade direction="left"  triggerOnce="true" duration="1500" >
            <div className="content-section">
                <div className="title">
                    <h1>About us</h1>
                </div>
                <div className="content">
                    <h3>Lorem ipsum,  olorum enim, exercitationem iure voluptate aspernatur!</h3>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit voluptatum quam itaque minus perferendis. Doloremque voluptate expedita cupiditate iure, in, at aspernatur nam tenetur fugit, animi mollitia natus ducimus facere.</p>
                    <div className="button">

                    </div>
                </div>
            </div>
            </Fade>
            <Fade direction="right"  triggerOnce="true" duration="1500">
            <div className="image-section">
                <img src="..\assets\secuirty-badge.jpg"/>
            </div>
            </Fade>
        </div>

      </div>


      {/* -------------------------------------------- */}

      <div className="section">
        <div className="container" >
          <Fade direction="left"  triggerOnce="true" duration="1500" >
            <div className="content-section">
                <div className="title">
                    <h1>About us</h1>
                </div>
                <div className="content">
                    <h3>Lorem ipsum,  olorum enim, exercitationem iure voluptate aspernatur!</h3>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit voluptatum quam itaque minus perferendis. Doloremque voluptate expedita cupiditate iure, in, at aspernatur nam tenetur fugit, animi mollitia natus ducimus facere.</p>
                    <div className="button">

                    </div>
                </div>
            </div>
            </Fade>
            <Fade direction="right"  triggerOnce="true" duration="1500">
            <div className="image-section">
                <img src="..\assets\secuirty-badge.jpg"/>
            </div>
            </Fade>
        </div>

      </div>

      {/* ------------------------------------------------------ */}


      <div className="section">
        <div className="container" >
          <Fade direction="left"  triggerOnce="true" duration="1500" >
            <div className="content-section">
                <div className="title">
                    <h1>About us</h1>
                </div>
                <div className="content">
                    <h3>Lorem ipsum,  olorum enim, exercitationem iure voluptate aspernatur!</h3>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit voluptatum quam itaque minus perferendis. Doloremque voluptate expedita cupiditate iure, in, at aspernatur nam tenetur fugit, animi mollitia natus ducimus facere.</p>
                    <div className="button">

                    </div>
                </div>
            </div>
            </Fade>
            <Fade direction="right"  triggerOnce="true" duration="1500">
            <div className="image-section">
                <img src="..\assets\secuirty-badge.jpg"/>
            </div>
            </Fade>
        </div>

      </div>

    </>
  );
}

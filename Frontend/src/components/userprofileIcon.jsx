
import "./CSS/userprofile.css";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";


export default function userprofile(props){
     
     const navigate = useNavigate();
  

     const logout = async () => {
        try {
            const response = await fetch('http://localhost:5000/logout', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',  
            });
    
            console.log('Logout successful:');
            navigate('/login');
            window.location.reload(); 
    
        } catch (error) {
            console.error('Error logging out:', error.message);
            
        }
    };
    
    

    const [active, changeclasss] = useState("");
     const imgclick = () => {
        if(active===""){
            changeclasss("active");
        }
        else changeclasss("");
      };

      const deleteCookie = (name) => {
        document.cookie = name;
    };
    

    return(

        <>
        <div className="bodymainproifle">
      <div className="containerprofile">
         <div className="wrapperprofile">
            <a href="#">
            <img className={`imgprof ${active}`} onclick={imgclick} src="../assets/profile_icon.jpg" />
            </a>
            <div className="titleprof">
               Aadarsh Mishra
            </div>
            <div className="placeprof">
            {props.logged_u.username}
            </div>
         </div>
         <div className="contentprof">
            <p>
               User Interface Designer and <br/>front-end developer
            </p>
            <div className="buttonsprof">
               <div className="btnprof">
                  <button className="buttonz" onClick={logout}>Logout</button>
               </div>
            </div>
         </div>
         
      </div>
      

</div>
        </>
    );
}
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {  FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {  useNavigate } from "react-router-dom"; // Correct import for navigation

import "./login.css";

export default function Login() {
  const navigate = useNavigate(); // Ensure this hook is at the top level of the functional component

  const clickhandler = () => {
    navigate("/"); // Use navigate to change the route
  };

  return (
    <Form className="wrapper">

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <MdEmail className="icon" />
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <FaLock className="icon" />
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remember me" />
      </Form.Group>
      <Form.Group className="submit-btn">
        <Button className="submit" type="submit" onClick={clickhandler}>
          Login
        </Button>
      </Form.Group>
  
    </Form>
  );
}

import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";
import { useState } from "react";
import "./signup.css";

export default function Signup() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate(); // Ensure this hook is at the top level of the functional component

  const clickhandler = (e) => {
    // e.preventDefault(); //so that no default value is entered by mistake
    // axios
    //   .post("http://localhost:5000/register", { email, password })
    //   .then((result) => {
    //     console.log(result);
    //     navigate("/"); //to move to home as soon as u regiter
    //   })
    //   .catch((err) => console.log(err));
      navigate("/"); //to move to home as soon as u regiter
  };

  return (
    <Form className="wrapper">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>User-name</Form.Label>
        <FaUser className="icon" />
        <Form.Control
          type="email"
          placeholder="Enter your name"
          onChange={(e) => setname(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <MdEmail className="icon" />
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => setemail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <FaLock className="icon" />
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setpassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remember me" />
      </Form.Group>
      <Form.Group className="submit-btn">
        <Button className="submit" type="submit" onClick={clickhandler}>
          Register
        </Button>
      </Form.Group>

      <Form.Group className="login">
        <Form.Text>Already have an account? </Form.Text>
        <Link to="/login">Login</Link>
      </Form.Group>
    </Form>
  );
}

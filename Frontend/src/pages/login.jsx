import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // Correct import for navigation

import "./login.css";
import Modal from "../components/modal";

export default function Login() {
  const navigate = useNavigate(); // Ensure this hook is at the top level of the functional component
  const [isopen, setisopen] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const clickhandler = async (e) => {
    e.preventDefault();
    const login = { username, password };

    try {
      console.log("Attempting to log in with:", login);
      const response = await axios.post("http://localhost:5000/login", login, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include cookies in the request if needed
      });

      console.log("Response from server:", response);

      if (response.status === 200) {
        //alert("Logged in successfully!");
        setusername("");
        setpassword("");
        // navigate("/"); // Uncomment if you want to redirect upon successful login
      } else {
        console.log("Login failed with status:", response.status);
        alert("Failed to Log-in.");
      }
    } catch (error) {
      console.error("Error logging-in:", error);
      alert("An error occurred while trying to log-in.");
    }

    setisopen(true);
  };

  return (
    <Form className="wrapper">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <MdEmail className="icon" />
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => setusername(e.target.value)}
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
        <Button className="submit" onClick={clickhandler}>
          Login
        </Button>
      </Form.Group>

      <Modal
        open={isopen}
        onclose={() => {
          setisopen(false);
        }}
        navigateto={true}
      >
        You are now Logged in !!
      </Modal>
    </Form>
  );
}

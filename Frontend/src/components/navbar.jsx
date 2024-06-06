import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import  Button  from "react-bootstrap/Button";
import {Link} from "react-router-dom";
// import  Button  from "react-bootstrap/Button";


export default function PNavbar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Pigeon</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>

        <Link to="/signup" type="button" variant="primary">Sign in</Link>{' '}
        <Link to="/login" type="button" variant="primary">Log in</Link>{' '}
      </Navbar>
    </>
  );
}

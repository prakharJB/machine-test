import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import React, { useState, useEffect } from "react";

function Header() {
  const [UserLogIn, setUserLogin] = useState("");

  useEffect(() => {
    userLogged();
  }, [UserLogIn]);

  const userLogged = () => {
    const username = localStorage.getItem("useremail");
    setUserLogin(username);
  };
  const LogoutBtn = () => {
    localStorage.removeItem("useremail");
    localStorage.removeItem("username");
  };
  return (
    <Navbar bg="primary" expand="md">
      <Container>
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {UserLogIn ? (
              <Nav.Link onClick={LogoutBtn} href="/signup">
                Sign Out
              </Nav.Link>
            ) : (
              <Nav.Link href="/signup">Sign up</Nav.Link>
            )}

            {/* <Nav.Link href="/login">Login</Nav.Link>   */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

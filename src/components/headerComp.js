import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
 
const HeaderComp = () => {
  const dispatch = useDispatch()

  const onLogout=()=>{
    dispatch({ type: "UPDATE_ISLOGIN", payload: false })
    localStorage.removeItem('localdata')
  }

  return (
    <Navbar
      collapseOnSelect
      expand="md"
      className="bg-light bg-opacity-25 text-white rounded-bottom "
      variant="dark">
      <Container>
        <Navbar.Brand>Milikita</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/administrator">Home</Link>
            <Link className="nav-link" to="/administrator/all">Permintaan</Link>
          </Nav>
          <Nav>
            <Link className="nav-link" to="/administrator/setting">Setting</Link>
            <Nav.Link className="nav-link" eventKey={2} onClick={onLogout}>
              Log Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderComp;

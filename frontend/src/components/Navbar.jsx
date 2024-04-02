import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link,useNavigate } from 'react-router-dom';

import { useAuth } from '../provider/authProvider';

function NavigationBar() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(auth.state);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    auth.setState(role);
    auth.setToken(null);
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={()=>{navigate('/')}} style={{cursor : "pointer"}}>Library Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="d-flex align-items-center">
          <Nav className="me-auto">
            {selectedRole === "Admin" ? (
              <>
                <Nav.Link as={Link} to="/books">Books</Nav.Link>
                <Nav.Link as={Link} to="/addbook">Add a New Book</Nav.Link>
                <Nav.Link as={Link} to="/editbook">Edit Existing Book</Nav.Link>
                <Nav.Link as={Link} to="/deletebook">Delete Book</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/books">See Books</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            <NavDropdown title={auth.state} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => handleRoleChange("User")}>User</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleRoleChange("Admin")}>Admin</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate()
    const storedUser = sessionStorage.getItem("existingUser")
    const currentUser = storedUser ? JSON.parse(storedUser) : null

    const handleLogout = () => {
        sessionStorage.removeItem("existingUser")
        sessionStorage.removeItem("token")
        navigate('/login')
    }

    return (
        <Navbar expand="lg">
            <Container >
                <Navbar.Brand as={Link} to="/">Roamify</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto fw-bold">
                        <Nav.Link as={Link} to="/" className="px-3">Home</Nav.Link>
                        <Nav.Link as={Link} to="/destination" className="px-3">Destinations</Nav.Link>
                        <Nav.Link as={Link} to="/service" className="px-3">Services</Nav.Link>
                        <Nav.Link as={Link} to="/rooms" className="px-3">Rooms</Nav.Link>
                        <Nav.Link as={Link} to="/about" className="px-3">About</Nav.Link>
                        <Nav.Link as={Link} to="/contact" className="px-3">Contact</Nav.Link>
                        <Nav.Link as={Link} to="/favourites" className="px-3 text-danger"><i className="fa-solid fa-heart"></i> Favourites</Nav.Link>
                    </Nav>

                    <NavDropdown className='ms-auto' title={<i className="fa-solid fa-user"></i>} id="basic-nav-dropdown" >
                        {currentUser ? (
                            <>
                                {currentUser.userType === 'admin' && (
                                    <NavDropdown.Item as={Link} to="/admin">Admin Panel</NavDropdown.Item>
                                )}
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </>
                        ) : (
                            <>
                                <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/register">
                                    Register
                                </NavDropdown.Item>
                            </>
                        )}
                    </NavDropdown>

                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default Header

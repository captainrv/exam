import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap'
function sidebar() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Online Exam</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Nav>
                            <Nav.Link as={Link} to="/">Competition</Nav.Link>
                            <Nav.Link as={Link} to="exam">Exam</Nav.Link>
                            <Nav.Link as={Link} to="examattempet">Exam Attempet</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
        </>
    )
}

export default sidebar

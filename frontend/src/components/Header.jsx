import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect >
                <Container>
                    <Navbar.Brand as={Link} to={'/'} >
                        <img src={logo} alt="proshop logo" />
                        PROSHOP
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav' >
                        <Nav className='ms-auto'>
                            <Nav.Link as={Link} to='/cart'><FaShoppingCart /><span className='ms-1' > Cart</span></Nav.Link>
                            <Nav.Link as={Link} to='/login'><FaUser /> <span className='ms-1'>Login</span></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header

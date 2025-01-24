import React from 'react';
import { Badge, Container, Nav, Navbar } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Header = () => {

    const { cartItems } = useSelector((state) => state.cart)

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
                            <Nav.Link as={Link} to='/cart'><FaShoppingCart /><span className='ms-1' > {cartItems.length > 0 && (<Badge pill bg='success' style={{marginLeft:"5px"}} >{cartItems.reduce((a,c)=> a+c.qty ,0)}</Badge>)} Cart</span></Nav.Link>
                            <Nav.Link as={Link} to='/login'><FaUser /> <span className='ms-1'>Login</span></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header

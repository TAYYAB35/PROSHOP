import React from 'react';
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice';
import { toast } from 'react-toastify';
import { clearCredentials } from '../slices/authSlice';

const Header = () => {

    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await logout().unwrap();
            dispatch(clearCredentials());
            toast.success('logged out successfully');
            navigate('/login');
        } catch (error) {
            toast.error(res?.data?.message);
            console.error(error);
        }
    }

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
                            <Nav.Link as={Link} to='/cart'><FaShoppingCart /><span className='ms-1' > {cartItems.length > 0 && (<Badge pill bg='success' style={{ marginLeft: "5px" }} >{cartItems.reduce((a, c) => a + c.qty, 0)}</Badge>)} Cart</span></Nav.Link>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username' >
                                    <NavDropdown.Item as={Link} to='/profile'>Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Nav.Link as={Link} to='/login'><FaUser /> <span className='ms-1'>Login</span></Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header >
    )
}

export default Header

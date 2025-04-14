import React from 'react';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector(state => state.cart);
    const userInfo = useSelector(state => state.auth);
    console.log(userInfo);
    
    const cartItems = cart.cartItems;

    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    }

    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        if (userInfo) {
            navigate('/shipping');
        } else {
            navigate('/login?redirect=shipping');
        }
    }

    return (
        <Row>
            <Col md={8} >
                <h1 style={{ marginTop: '2rem' }} > Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Your cart is empty. <Link to='/'>Go back to Shop</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush' >
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.name} >
                                <Row>
                                    <Col md={2} >
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>

                                    <Col md={3} >
                                        <Link to={`/products/${item._id}`}>{item.name}</Link>
                                    </Col>

                                    <Col md={2} >
                                        ${item.price}
                                    </Col>
                                    <Col md={2} >
                                        <Form.Control
                                            as='select'
                                            value={item.qty}
                                            onChange={(e) => addToCartHandler(item, Number(e.target.value))}>
                                            {[...Array(item.countInStock).keys()].map((x) =>
                                                <option value={x + 1} key={x + 1} >
                                                    {x + 1}
                                                </option>
                                            )}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2} >
                                        <Button variant='light' type='button' onClick={() => removeFromCartHandler(item._id)}>
                                            <FaTrash className='text-danger' />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )
                }</Col>
            <Col md={4} >
                <Card>
                    <ListGroup variant='flush' >
                        <ListGroup.Item>
                            <h2>Subtotal ${cartItems.reduce((a, i) => (a + i.qty), 0)} items</h2>
                            ${cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                Proceed to Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
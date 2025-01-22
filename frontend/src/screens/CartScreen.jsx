import React from 'react';
import { Row, Col, ListGroup, Image, Form, Button, Card  } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';

const CartScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector(state => state.cart);
    const cartItems = cart.cartItems;

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
                            <ListGroup.Item key={item.product} >
                                <Row>
                                    <Col md={2} >
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>

                                    <Col md={3} >
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>

                                    <Col md={2} >
                                        ${item.price}
                                    </Col>
                                    <Col md={2} >
                                        <Form.Control
                                            as='select'
                                            value={item.qty}
                                            onChange={(e) => {}}>
                                            {[...Array(item.countInStock).keys()].map((x) =>
                                                <option value={x + 1} key={x + 1} >
                                                    {x + 1}
                                                </option>
                                            )}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )
                }</Col>
        </Row>
    )
}

export default CartScreen
import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useGetMyOrdersQuery } from '../slices/orderApiSlice';
import { FaTimes } from 'react-icons/fa'

const ProfileScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo.name, userInfo.email]);

    const [profile, { isLoading, isError, error }] = useProfileMutation();
    const { data: orders, isLoading: orderLoading, error: orderError } = useGetMyOrdersQuery();
    console.log(orders, 'order');


    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Password do not match');
        } else {
            try {
                const res = await profile({ _id: userInfo._id, name, email, password }).unwrap();
                dispatch(setCredentials(res));
                toast.success('Profile Updated');
            } catch (error) {
                console.error('Failed to update profile', error?.data?.message);
            }
        }
    }

    return (
        <>
            {isLoading && <Loader />}
            {isError && <Message variant='danger'>{error.message}</Message>}
            <Row>

                <Col md={3}>
                    <h1>Profile</h1>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name' className='mt-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId='email' className='mt-3'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>
                        <Form.Group controlId='password' className='mt-3'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId='confirmPassword' className='my-3'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </Form.Group>
                        <Button type='submit' variant='primary'>Update</Button>

                    </Form>
                </Col>
                <Col md={9}>
                    <h2>My Orders</h2>
                    {orderLoading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant='danger'>{error?.data?.message || error?.message}</Message>
                    ) : (
                        <Table striped hover responsive className='table-sm' >

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Delivered</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>{order.isPaid ? (
                                            order.paidAT.substring(0, 10)
                                        ) : (
                                            <FaTimes style={{ color: 'red' }} />
                                        )}</td>
                                        <td>{order.isDelivered ? (
                                            order.deliveredAT.substring(0, 10)
                                        ) : (
                                            <FaTimes style={{ color: 'red' }} />
                                        )}</td>
                                        <td>
                                            <Link to={`/order/${order._id}`} >
                                                <Button variant='info'>Details</Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </Table>
                    )}
                </Col>


            </Row>
        </>
    )
}

export default ProfileScreen
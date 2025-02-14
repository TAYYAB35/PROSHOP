import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import { useGetOrderDetailsQuery, useGetPayPalClientIdQuery, usePayOrderMutation } from '../slices/orderApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';

const OrderScreen = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    // Fetch order details
    const { data: order, refetch, isLoading, isError } = useGetOrderDetailsQuery(id);

    // PayPal related
    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
    const { data: paypal, isLoading: loadingPayPal, isError: paypalError } = useGetPayPalClientIdQuery();

    // User authentication
    const { userInfo } = useSelector((state) => state.auth);

    // Load PayPal script only when required
    useEffect(() => {
        if (!paypalError && paypal && !loadingPayPal) {
            const loadPayPalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    options: {
                        'client-id': paypal.clientId,
                        currency: "USD",
                    }
                });
                paypalDispatch({
                    type: "setLoadingStatus",
                    value: 'pending',
                });
            };

            if (order && !order.isPaid) {
                if (!window.paypal) {
                    loadPayPalScript();
                }
            }
        }
    }, [order, paypal, paypalDispatch, loadingPayPal, paypalError]);

    // Test Payment Function (Mark as Paid)
    const onApproveTest = async () => {
        try {
            await payOrder({ orderId: order._id, status: 'COMPLETED' });
            refetch();
            toast.success("Order marked as paid successfully.");
        } catch (error) {
            toast.error("Test payment failed.");
        }
    };

    // PayPal: Create Order
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: { value: order.totalPrice }
            }]
        });
    };

    // PayPal: Order Approved
    const onApprove = (data, actions) => {
        return actions.order.capture().then(async (details) => {
            try {
                await payOrder({ orderId: order._id, status: details.status });
                refetch();
                toast.success("Payment Successful!");
            } catch (error) {
                toast.error("Payment update failed.");
            }
        });
    };

    // PayPal: Error Handling
    const onError = (error) => {
        toast.error(`Payment Failed: ${error.message}`);
    };

    return isLoading ? <Loader /> : isError ? <Message variant="danger" /> : (
        <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong> {order.user.name}</p>
                            <p><strong>Email: </strong> {order.user.email}</p>
                            <p><strong>Address: </strong> 
                                {order.shippingAddress.address}, {order.shippingAddress.city}, 
                                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant="success">Delivered on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant="danger">Not delivered yet</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p><strong>Method: </strong> {order.paymentMethod}</p>
                            {order.isPaid ? (
                                <Message variant="success">Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant="danger">Not paid yet</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                <Message variant="warning">No order items</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map(item => (
                                        <ListGroup.Item key={item._id}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid />
                                                </Col>
                                                <Col md={5}>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={5}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                                <p><strong>Items: </strong> ${order.itemsPrice}</p>
                                <p><strong>Shipping Price: </strong> ${order.shippingPrice}</p>
                                <p><strong>Tax Price: </strong> ${order.taxPrice}</p>
                                <p><strong>Total Price: </strong> ${order.totalPrice}</p>

                                {!order.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loader />}
                                        {isPending ? <Loader /> : (
                                            <div>
                                                <Button onClick={onApproveTest} style={{ marginBottom: '10px' }}>
                                                    Test Pay Order
                                                </Button>
                                                <div>
                                                    <PayPalButtons 
                                                        createOrder={createOrder} 
                                                        onApprove={onApprove} 
                                                        onError={onError} 
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </ListGroup.Item>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default OrderScreen;

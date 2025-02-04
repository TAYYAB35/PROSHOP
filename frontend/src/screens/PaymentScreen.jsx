import React from 'react';
import { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button, Col } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../slices/cartSlice'

const PaymentScreen = () => {

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping');
        }
    }, [shippingAddress,navigate]);

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
        // Make the payment request here
        // For demo purposes, we'll just simulate it
        // setTimeout(() => {
        //     navigate('/placeorder');
        // }, 2000);
        // Simulate payment request
        // axios.post('/api/payment', { paymentMethod, shippingAddress })
        //    .then(res => {
        //         navigate('/placeorder');
        //     })
        //    .catch(err => {
        //         console.error(err);
        //         alert('Error processing payment');
        //     });
        // End of simulated payment request
    }

    return (
        <FormContainer>

            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler} >
                <Form.Group as={Col} controlId="formGridPaymentMethod">
                    <Form.Label>Select Payment Method</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio" className='my-2' label="Paypal or credit card" value='Paypal' id='paypal' name='paymentMethod' checked onChange={(e) => setPaymentMethod(e.target.value)} >
                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary' className='mx-auto'>
                    Continue
                </Button>
            </Form>

        </FormContainer>
    )
}

export default PaymentScreen
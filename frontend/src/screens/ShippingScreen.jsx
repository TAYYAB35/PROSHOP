import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';

const ShippingScreen = () => {

    const [address, SetAddress] = React.useState('');
    const [city, SetCity] = React.useState('');
    const [postalCode, SetPostalCode] = React.useState('');
    const [country, SetCountry] = React.useState('');
    const dispatch = useDispatch();

    const { cart } = useSelector((state) => state.cart);
    // const { shippingAddress } = cart;
    console.log(cart,'cart');
    

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('submit');
        // dispatch(saveShippingAddress({ address, city, postalCode, country }));
    }

    return (
        <FormContainer>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address' className='mb-3'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Address'
                        value={address}
                        onChange={(e) => SetAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='city' className='mb-3'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter City'
                        value={city}
                        onChange={(e) => SetCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode' className='mb-3'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Postal Code'
                        value={postalCode}
                        onChange={(e) => SetPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='country' className='mb-3'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Country'
                        value={country}
                        onChange={(e) => SetCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='mx-auto'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
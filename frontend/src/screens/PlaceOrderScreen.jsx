import React, { useEffect } from 'react';
import CheckoutSteps from '../components/CheckoutSteps'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PlaceOrderScreen = () => {

  const navigate = useNavigate();
  const cart = useSelector((state) => (state.cart))
  console.log('cart', cart.shippingAddress?.address);

  useEffect(() => {
    if (!cart.shippingAddress?.address) {
      navigate('/shipping')
    } else if (!cart.paymentMethod) {
      navigate('/payment')
    }
  }, [cart.paymentMethod, cart.ShippingAddress?.address, navigate])

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <h1> </h1>
    </div>
  )
}

export default PlaceOrderScreen
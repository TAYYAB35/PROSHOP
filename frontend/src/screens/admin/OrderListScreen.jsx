import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { useGetOrdersQuery } from '../../slices/orderApiSlice'
import { Link } from 'react-router-dom';

const OrderListScreen = () => {

  const { data: orders, isLoading, error } = useGetOrdersQuery();


  return (
    <>
      <h1>Orders</h1>
      {isLoading ? <Loader /> : error ? <Message variant={danger}>{error}</Message> : (
        <Table striped bordered responsive className='table-sm' hover >
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.isPaid ? (order.paidAT.substring(0, 10)) : <FaTimes style={{ color: 'red' }} />}</td>
                <td>{order.isDelivered ? (order.deliveredAT.substring(0, 10)) : <FaTimes style={{ color: 'red' }} />}</td>
                <td>{order.totalPrice}</td>
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
    </>
  )
}

export default OrderListScreen
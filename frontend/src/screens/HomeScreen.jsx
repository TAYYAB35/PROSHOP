import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Product from '../components/Product.jsx';
import { useGetProductsQuery } from '../slices/productApiSlice.js'
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { useParams } from 'react-router-dom';

const HomeScreen = () => {

    const { pageNumber } = useParams()

    const { data, isLoading, error } = useGetProductsQuery({pageNumber});

    return (
        <div>
            {isLoading ? (
                <Loader />) : error ? (
                    <Message variant={'danger'} >
                        {error.error}
                    </Message>
                ) : (
                <div>
                    <h1>Latest Products</h1>
                    <Row>
                        {data.products && data.products.map((product) => (
                            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                                <Product product={product} ></Product>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}

        </div>
    )
}

export default HomeScreen

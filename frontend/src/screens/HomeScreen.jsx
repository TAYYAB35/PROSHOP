import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import products from '../../products.js'
import Product from '../components/Product.jsx';

const HomeScreen = () => {
    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {products && products.map((product) => (
                    <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                        <Product product={product} ></Product>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreen

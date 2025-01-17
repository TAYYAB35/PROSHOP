import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Product from '../components/Product.jsx';
import axios from 'axios';

const HomeScreen = () => {

    const [products, setProducts] = useState();
    useEffect(() => {
        const fetchProduct = async () => {
            const {data} = await axios.get('/api/products');
            setProducts(data);
        }

        fetchProduct()
    }, [])

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

import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Product from '../components/Product.jsx';
import { useGetProductsQuery, useGetTopProductsQuery } from '../slices/productApiSlice.js'
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { Link, useParams } from 'react-router-dom';
import Paginate from '../components/Paginate.jsx';
import ProductCarosule from '../components/ProductCarosule.jsx';

const HomeScreen = () => {

    const { pageNumber, keyword } = useParams()

    const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });

    const [topProductsState, setTopProductsState] = useState([])

    return (

        <>
            {!keyword ? <ProductCarosule /> : (<Link to={'/'} className='btn btn-light' >Go Back</Link>)}
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
                    <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
                </div>
            )}
            {data?.products?.length === 0 && <div className='d-flex ' style={{ flexDirection: 'column' }} >
                <img src="https://static.vecteezy.com/system/resources/previews/024/676/396/original/no-data-found-illustration-for-sites-banner-design-illustration-vector.jpg" className='img-fluid ' style={{ maxHeight: '400px', width: 'auto', objectFit: 'contain' }} alt="" />
            </div>}
        </>

    )
}

export default HomeScreen

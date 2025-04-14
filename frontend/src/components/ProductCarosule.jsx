import React from 'react';
import { Carousel, Image } from 'react-bootstrap';
import Loader from './Loader.jsx';
import Message from './Message.jsx';
import { Link } from 'react-router-dom';
import { useGetTopProductsQuery } from '../slices/productApiSlice.js';

const ProductCarosule = () => {

    const { data, isLoading, error } = useGetTopProductsQuery();

    console.log(data);


    return (
        <div>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant={'danger'} >
                    {error.error}
                </Message>
            ) : (
                <>
                    <h1>Top Products</h1>
                    <Carousel pause='hover' className='bg-dark'  >
                        {data && data.map((product) => (
                            <Carousel.Item key={product._id}>
                                <Link to={`/products/${product._id}`}>
                                    <Image src={product.image} alt={product.name} fluid />
                                    <Carousel.Caption className='carousel-caption'>
                                        <h2>{product.name} (${product.price})</h2>
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </>
            )}

        </div>
    )
}

export default ProductCarosule
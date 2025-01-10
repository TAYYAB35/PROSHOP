import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    return (
        <Card className='p-3 my-3 rounded' >
            <Link to={`/prodcut/${product._id}`}>
                <Card.Img className="img" src={product.image} variant='top' />
            </Link>
            <Card.Body>
                <Link to={`/prodcut/${product._id}`}>
                    <Card.Title as="div" >
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as='h3'>
                    ${product.price}
                </Card.Text>

            </Card.Body>
        </Card>
    )
}

export default Product

import React from 'react';
import products from './../../products'
import { Link, useParams } from 'react-router-dom';
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import Rating from '../components/Rating';

const ProductScreen = () => {
  const { id: productId } = useParams(); // the id has datatype of string
  const product = products.find((p) => p._id == productId);

  return (
    <>
      <Link className='btn btn-light my-3' to='/' >Go Back </Link>
      <Row>
        <Col md={5} >
          <Image src={product.image} fluid alt={product.name} />
        </Col>
        <Col md={4} >
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: ${product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3} >
          <Card  >
            <ListGroup variant='flush' >
              <ListGroup.Item >
                <Row>
                  <Col>
                    Stock:
                  </Col>
                  <Col>
                    <strong>
                      {product.countInStock}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item >
                <Row>
                  <Col>
                    Status
                  </Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? "InStock" : 'OutStock'}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item >
                <button className='btn btn-block w-100 btn-primary' type='button' disabled={product.countInStock === 0}>
                  Add to cart
                </button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
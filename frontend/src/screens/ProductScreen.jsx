import React, { } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useGetProductDetailsQuery } from '../slices/productApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { addToCart } from './../slices/cartSlice';
import { useDispatch } from 'react-redux';

const ProductScreen = () => {

  const { id: productId } = useParams(); // the id has datatype of string

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

  const [qty, setQty] = React.useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/' >Go Back </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={'danger'} >
          {error?.error || "An error occurred while fetching the product."} </Message>
      ) : (
        <Row>
          <Col md={5} >
            <Image src={product?.image} fluid alt={product.name} />
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

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}>
                          {[...Array(product.countInStock).keys()].map((x) =>
                            <option value={x + 1} key={x + 1} >
                              {x + 1}
                            </option>
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item >
                  <button className='btn btn-block w-100 btn-primary' type='button' disabled={product.countInStock === 0} onClick={addToCartHandler}>
                    Add to cart
                  </button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
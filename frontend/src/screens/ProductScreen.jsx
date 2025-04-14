import React, { } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Card, Col, Image, ListGroup, Row, Toast } from 'react-bootstrap';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { addToCart } from './../slices/cartSlice';
import Rating from '../../src/components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import Meta from '../components/Meta';

const ProductScreen = () => {

  const { id: productId } = useParams(); // the id has datatype of string

  const { data: product, refetch, isLoading, error } = useGetProductDetailsQuery(productId);
  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation(); // createReview is a function that can be called to create a review


  // useSelector is used to access the state of the redux store
  // useDispatch is used to dispatch actions to the redux store

  const [qty, setQty] = React.useState(1);
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState('');

  const { userInfo } = useSelector((state) => state.auth); // userInfo is the user object that is stored in the redux store

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch(); // refetch the product details after creating a review
      setRating(0);
      setComment('');
      Toast.success('Review submitted successfully!');
    } catch (err) {
      Toast.error(err?.data?.message || err.error );
      console.error(error);
    }
  }

  return (
    <>
      <Meta title={product?.name} description={product?.description}  />
      <Link className='btn btn-light my-3' to='/' >Go Back </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={'danger'} >
          {error?.error || "An error occurred while fetching the product."} </Message>
      ) : (
        <>
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
          <Row className='review'>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>

                  <h2>Write a Customer Review</h2>

                  {loadingProductReview && <Loader />}

                  {userInfo ? (
                    <Form onSubmit={handleSubmitReview}>
                      <Form.Group controlId='rating' className='my-2'>

                        <Form.Label>Rating</Form.Label>
                        <Form.Control as='select' value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>

                      </Form.Group>

                      <Form.Group controlId='comment' className='my-2'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as='textarea' row='5' value={comment} onChange={(e) => setComment(e.target.value)} />
                      </Form.Group>

                      <button type='submit' className='btn btn-primary my-3' disabled={loadingProductReview} >
                        Submit
                      </button>

                    </Form>
                  ) : (
                    <Message variant='info'>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                  )}

                </ListGroup.Item>
              </ListGroup>

            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
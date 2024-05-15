import React from 'react'
import {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form, ListGroupItem } from 'react-bootstrap'
import { fetchDetailProduct } from '../slices/productsSlice';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'


function ProductScreen() {
    const navigate=useNavigate()
    const [qty, setQty] = useState(1)
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.detail.detail);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);

   
    useEffect(() => {
      dispatch(fetchDetailProduct(id));
    }, [dispatch, id]);

    const addToCartHandler = () => {
        console.log('Add to cart', qty)
        navigate(`/cart/${id}?qty=${qty}`)
    }

    if (loading) {

        return <div> <Loader /></div>;
    }

    if (error) {

        return <div><Message variant='danger'>{error}</Message></div>;
    }
    if (!loading && error === null) {

    return (
            
        <div>
            <Link to="/" className='btn btn-light my-3'>Go Back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid></Image>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>

                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} >
                            </Rating>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price: {product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <ListGroup variant='flush'>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Price:
                                </Col>
                                <Col>   
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Status:
                                </Col>
                                <Col>   
                                    {product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Qty
                                    </Col>
                                    <Col>
                                        <Form.Control xs='auto' className='my-1' as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                            {
                                                [...Array(product.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}
                        <ListGroup.Item>
                                <Button 
                                onClick={addToCartHandler}
                                className='btn-block' 
                                disabled={product.countInStock == 0} 
                                type='button'>
                                    Add to cart
                                </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            {product.name}
          Product
        </div>
    )
    }
}
export default ProductScreen

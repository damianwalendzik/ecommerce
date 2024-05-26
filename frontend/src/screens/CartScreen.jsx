import React from 'react'
import {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Message from '../components/Message'


function CartScreen() {
    const navigate = useNavigate()
    const { id } = useParams();
    const searchParams = new URLSearchParams(location.search);
    const quantity = +searchParams.get('qty');

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cartitems.cartItems);
    const loading = useSelector((state) => state.cartitems.loading);
    const error = useSelector((state) => state.cartitems.error);
    console.log('cart screen dispatched data from the state. cartItems:', cartItems, 'loading:', loading, 'error:', error)

    useEffect(() => {
        if(id){
            dispatch(addToCart({id, quantity}));
        }
      }, [dispatch, id, quantity]);


    const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id))
      }
    

  const checkoutHandler = () => {
    navigate('/shipping')
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <message variant='info'>
            Your cart is empty <Link to='/'>Go Back</Link>
          </message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${item.product}`}>
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>
                    {item.price}
                  </Col>
                  <Col md={3}>
                  <Form.Control 
                  xs='auto' 
                  className='my-1' 
                  as='select' 
                  value={item.quantity} 
                  onChange={(e) => dispatch(addToCart({id: item.product, quantity: Number(e.target.value)}))}
                  >
                    {
                      [...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))
                    }
                  </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                total({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items
                ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
              </h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen

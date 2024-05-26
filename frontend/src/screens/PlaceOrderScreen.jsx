import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Col, Row, ListGroup, Image, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import FormComponent from '../components/FormComponent'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../slices/shippingSlice'
import Message from '../components/Message'


function PlaceOrderScreen() {
    const cart = useSelector((state) => state.cartitems.cartItems)
    const shippingAddress = useSelector((state) => state.shipping.shippingAddress)
    const paymentMethod = useSelector((state) => state.shipping.paymentMethod)

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Col md={8}>
        <ListGroup variant='flush'>
            <ListGroup.Item>
                <h2>
                    Shipping
                </h2>
                <p>
                    <strong>Shipping: </strong>
                    {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                </p>
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>
                    Payment Method
                </h2>
                <p>
                    <strong>Payment Method: </strong>
                    {paymentMethod}
                </p>
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>
                    Order Items
                </h2>
                <p>
                    <strong>Order Items: </strong>
                    {cart.length === 0 ? 
                    <Message>
                        Your Cart is empty.
                    </Message>
                    : (
                        <ListGroup variant='flush'>
                            {cart.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={2}>
                                            <Image  src={item.image} 
                                                    alt={item.name} 
                                                    fluid 
                                                    rounded 
                                                    style={{ maxWidth: '100px', maxHeight: '100px' }} 
/>
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.quantity} X {item.price}&euro; = {(item.quantity * item.price).toFixed(2)}&euro;
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </p>
            </ListGroup.Item>

        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>
                        Order Summary
                    </h2>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>
                        Item: 
                        </Col>
                        <Col>
                            ooooo
                        </Col>
                    </Row>
                </ListGroup.Item>

            </ListGroup>
        </Card>
      </Col>
    </div>
  )
}

export default PlaceOrderScreen

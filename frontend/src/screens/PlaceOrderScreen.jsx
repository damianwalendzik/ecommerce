import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Col, Row, ListGroup, Image, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import FormComponent from '../components/FormComponent'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../slices/shippingSlice'
import Message from '../components/Message'
import { CreateOrder } from '../slices/orderSlice'


function PlaceOrderScreen() {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cartitems.cartItems)
    const shippingAddress = useSelector((state) => state.shipping.shippingAddress)
    const paymentMethod = useSelector((state) => state.shipping.paymentMethod)

    const ItemsPrice = parseFloat(cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2))
    const ShippingPrice =  parseFloat((ItemsPrice > 100 ? 10 : 0).toFixed(2))
    const TaxPrice = parseFloat((ItemsPrice * 0.23).toFixed(2))
    const TotalPrice = (ItemsPrice + ShippingPrice + TaxPrice).toFixed(2)
    const input = {
                    "cart": cart, 
                    "shippingAddress": shippingAddress, 
                    "paymentMethod": paymentMethod,
                    "ItemsPrice": ItemsPrice,
                    "ShippingPrice": ShippingPrice,
                    "TaxPrice": TaxPrice, 
                    "TotalPrice": TotalPrice
                }
    console.log(input)
    const placeOrder = () => {
        console.log("placeorder")
        dispatch(CreateOrder({input}))
    }
    console.log("cart", cart)
    console.log("shippingAddress", shippingAddress)
    console.log("paymentMethod", paymentMethod)
    console.log("ItemsPrice", ItemsPrice)
    console.log("TaxPrice", TaxPrice)
    console.log("TotalPrice", TotalPrice)

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
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
                <div>
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
                                        <Col >
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
                                        <Col >
                                            {item.quantity} X {item.price}&euro; = {(item.quantity * item.price).toFixed(2)}&euro;
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </div>
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
                            {ItemsPrice}&euro;
                        </Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>
                        Shipping: 
                        </Col>
                        <Col>
                            {ShippingPrice}&euro;
                        </Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>
                        Tax: 
                        </Col>
                        <Col>
                            {TaxPrice}&euro;
                        </Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>
                        Total: 
                        </Col>
                        <Col>
                            {TotalPrice}&euro;
                        </Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Button type='button' 
                            className='btn-block' 
                            disabled={cart.length === 0} 
                            variant='primary'
                            onClick={placeOrder}>
                        Place Order
                    </Button>
                </ListGroup.Item>
            </ListGroup>
        </Card>
      </Col>
      </Row>
    </div>
  )
}

export default PlaceOrderScreen

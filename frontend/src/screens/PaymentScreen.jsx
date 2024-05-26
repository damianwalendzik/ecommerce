import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import FormComponent from '../components/FormComponent'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../slices/shippingSlice'
function PaymentScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector((state) => state.cartitems.cartItems)
    const shippingAddress = useSelector((state) => state.shipping.shippingAddress)

    const [PaymentMethod, setPaymentMethod] = useState('Paypal')

    if (!shippingAddress) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(PaymentMethod))
        navigate('/placeorder')
}
  return (
    <FormComponent>
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler}>
        <Form.Group>
            <Form.Label as='legend'>
                Select Method
            </Form.Label>
            <Col>
                <Form.Check
                type='radio'
                label='Paypal or Credit Card'
                id='paypal'
                name='paymentMethod'
                checked
                onChange={(e)=>{
                    setPaymentMethod(e.target.value)
                }}
                >

                </Form.Check>
            </Col>
        </Form.Group>
        <Button type='submit' variant='primary'>
            Continue
        </Button>
      </Form>
    </FormComponent>
  )
}

export default PaymentScreen

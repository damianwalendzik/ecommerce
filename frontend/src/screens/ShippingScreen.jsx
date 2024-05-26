import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import FormComponent from '../components/FormComponent'
import {setShippingAddress} from '../slices/shippingSlice'


function ShippingScreen() {
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        const shippingData = { address, city, postalCode, country }
        dispatch(setShippingAddress(shippingData))
        navigate('/checkout')
    }
  return (
    <FormComponent>
      <Form onSubmit={submitHandler}>
        <h1>Shipping</h1>
        <Form.Group controlId='address'>
            <Form.Label>
                Address
            </Form.Label>
            <Form.Control   required
                            type='text' 
                            placeholder='Enter address' 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)}
                            >
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='address'>
            <Form.Label>
                City
            </Form.Label>
            <Form.Control   required
                            type='text' 
                            placeholder='Enter city' 
                            value={city} 
                            onChange={(e) => setCity(e.target.value)}
                            >
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='address'>
            <Form.Label>
                PostalCode
            </Form.Label>
            <Form.Control   required
                            type='text' 
                            placeholder='Enter postal code' 
                            value={postalCode} 
                            onChange={(e) => setPostalCode(e.target.value)}
                            >
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='address'>
            <Form.Label>
                Country
            </Form.Label>
            <Form.Control   required
                            type='text' 
                            placeholder='Enter address' 
                            value={country} 
                            onChange={(e) => setCountry(e.target.value)}
                            >
            </Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
        Checkout
        </Button>

        </Form>
    </FormComponent>
  )
}

export default ShippingScreen

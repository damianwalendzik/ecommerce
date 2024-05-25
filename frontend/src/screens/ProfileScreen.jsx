import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormComponent from '../components/FormComponent'

import { updateUser } from '../slices/userSlice'



function ProfileScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    // const [formSubmitted, setFormSubmitted] = useState(false);

    var formSubmit = false
    const loading = useSelector((state) => state.userinfo.loading);
    const error = useSelector((state) => state.userinfo.error);
    const userInfo = useSelector((state) => state.userinfo.userInfo)
    console.log(userInfo.email)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        if (!setName) {
            navigate('/login');
        } else {
            setName(userInfo.name)
            setEmail(userInfo.email)
        }
    }, [setEmail, setName, setName, navigate]);

    const SubmitHandler = (e) => {
        e.preventDefault()
      if (password !== confirmPassword) {
        console.log('Password do not match')
        setMessage('Password do not match')
      } else {
        dispatch(updateUser({ name, email, password }))
        console.log("UPDATING PROFILE")
      }
    }

    const renderError = (error) => {
      if (typeof error === 'string') {
        return error;
      } else if (error && typeof error === 'object') {
        return JSON.stringify(error);
      }
      return 'An unknown error occurred';
    };

  return (
    <Row>
      <Col md={4}>
        <h2>User Profile</h2>
        
      <Form onSubmit={SubmitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name </Form.Label>
          <Form.Control type='name' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='passwordConfirm'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
        Update
          </Button>
    </Form>
      </Col>
      <Col md={6}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen

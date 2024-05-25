import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormComponent from '../components/FormComponent'

import { registerUser } from '../slices/userSlice'

function RegisterScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [formSubmitted, setFormSubmitted] = useState(false);

    var formSubmit = false
    const loading = useSelector((state) => state.userinfo.loading);
    const error = useSelector((state) => state.userinfo.error);

    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        if (formSubmitted && !loading && !error) {
            navigate('/login');
        }
    }, [formSubmitted, loading, error, navigate]);

    const SubmitHandler = () => {
      setFormSubmitted(true);
      dispatch(registerUser({ name, email, password }))   
      console.log(email, password)
      if (password != confirmPassword) {
        console.log('Password do not match')
        setMessage('Password do not match')
      } else {

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
    <FormComponent>
      <h1>Sign in</h1>
      {message && <Message variant='danger'>{message}</Message>} 
      {error && <Message variant='danger'>{renderError(error)}</Message>} 
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
          <Form.Control type='password' placeholder='confirm Password'>
          </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' value={formSubmitted} onClick={(e) => setFormSubmitted(e.target.value)}>
        Register
          </Button>
      </Form>
      <Row className='py-3'>
        <Col>
        Already Registered?
          <Link to='/login'>
            Login
          </Link>
        </Col>
      </Row>
    </FormComponent>
  )
}

export default RegisterScreen
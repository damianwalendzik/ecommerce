import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormComponent from '../components/FormComponent'

import { loginUser } from '../slices/userSlice'

function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const userLogin = useSelector((state) => state.userinfo.userInfo);
    const loading = useSelector((state) => state.userinfo.loading);
    const error = useSelector((state) => state.userinfo.error);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
      if (userLogin) {
        navigate('/');
      }
    }, [userLogin, navigate])

    const SubmitHandler = (e) => {
      e.preventDefault()
      dispatch(loginUser({ email, password }))    
      console.log(email, password)
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
      {error && <Message variant='danger'>{renderError(error)}</Message>} 
      <Form onSubmit={SubmitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Sign In
          </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New customer?   
          <Link to='/register'>
            Register
          </Link>
        </Col>
      </Row>
    </FormComponent>
  )
}

export default LoginScreen

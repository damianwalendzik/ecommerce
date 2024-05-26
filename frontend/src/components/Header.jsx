import React from 'react'
import {Container, NavDropdown, Row} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import {Container, Row} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';


import { logoutUser } from '../slices/userSlice'
import { clearShippingAddress } from '../slices/shippingSlice'
import { clearCart } from '../slices/cartSlice'

function Header() {
  const dispatch = useDispatch()
  const LogoutHandler = () => {
    dispatch(logoutUser())
    dispatch(clearShippingAddress())
    dispatch(clearCart())

  }
  const User = useSelector((state) => state.userinfo.userInfo)
  return (
    <header>
    <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect >
      <Container>
        <LinkContainer to="/">
        <Navbar.Brand>My Shop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

          <LinkContainer to="/cart">
            <Nav.Link ><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
          </LinkContainer>
          { User ? (
            <NavDropdown title={User.name} id='username'>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>
                  Profile
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={LogoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
            <LinkContainer to="/login">
              <Nav.Link ><i className='fas fa-user'></i> Login</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/register">
              <Nav.Link ><i className='fas fa-user'></i> register</Nav.Link>
            </LinkContainer>
            </>
          )}

            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header

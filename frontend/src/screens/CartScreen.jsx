import React from 'react'
import {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Message from '../components/Message'


function CartScreen() {
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
  return (
    <div>
      Cart
    </div>
  )
}

export default CartScreen

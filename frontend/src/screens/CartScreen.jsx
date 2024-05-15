import React from 'react'
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../slices/cartSlice';

function CartScreen() {
    const { id, qty } = useParams();
    const dispatch = useDispatch();
    const cartitems = useSelector((state) => state.cartitems.cartitems);
    const loading = useSelector((state) => state.cartitems.loading);
    const error = useSelector((state) => state.cartitems.error);

    useEffect(() => {
        dispatch(fetchCart(id));
      }, [dispatch, id, qty]);
  return (
    <div>
      Cart
    </div>
  )
}

export default CartScreen

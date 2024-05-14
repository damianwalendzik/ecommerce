import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'

function HomeScreen() {

  const dispatch = useDispatch()
  
  const productList = useSelector( state => state.productlist)
  const { error, loading, products } = productList
  useEffect(() => {
    dispatch(listProducts())
  }, [])
  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products.map(product => (
            <Col sm={12} md={6} lg={4} xl={3} key={product.id}>
              <Product product={product} key={product.id}/>
            </Col>
        ))}
      </Row>
    </div>
  )
}

export default HomeScreen

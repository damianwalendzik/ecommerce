import React from 'react'
import products from '../products.jsx';
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'

function HomeScreen() {
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

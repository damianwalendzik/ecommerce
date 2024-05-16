import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../slices/productsSlice';
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'


function HomeScreen() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  console.log('home screen dispatched data from the state. products:', products, 'loading:', loading, 'error:', error)
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Latest Products</h1>
      { loading ? <Loader />
      : error ? <Message variant='danger'>{error}</Message> 
      : <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product.id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>}
        
    </div>
  )
}

export default HomeScreen

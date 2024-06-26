import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
function Product({ product }) {
    if (!product) {
        return null; // Or you can return a loading indicator or some other fallback UI
      }
    
  return (
    <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${product.id}`} >
        <Card.Img src={product.image} />
        </Link>
        <Card.Body>
            <Link to={`/product/${product.id}`} >
            <Card.Title as="div">
                <strong>{product.name}</strong>
            </Card.Title>
            </Link>

            <Card.Text as="div">
                <div className='my-3'>
                </div>
            </Card.Text>

            <Card.Text as="h3">
                {product.price} &euro;
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product

import React from 'react'
import { Card } from 'react-bootstrap'

import Rating from './Rating'
function Product({ product }) {
  return (
    <Card className='my-3 p-3 rounded'>
        <a href={`/product/${product.id}`} ></a>
        <Card.Img src={product.image} />

        <Card.Body>
            <a href={`/product/${product.id}`} >
            <Card.Title as="div">
                <strong>{product.name}</strong>
            </Card.Title>
            </a>

            <Card.Text as="div">
                <div className='my-3'>
                    <Rating value={product.rating} text={`${product.numReviews} Reviews`} color={'#f8e825'} />
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

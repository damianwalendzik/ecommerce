import React from 'react'
import {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'

// import { Rating } from '../components/Rating.jsx'
import products from '../products'
import Rating from '../components/Rating'
import axios from 'axios'


function ProductScreen() {

    const { id } = useParams()
    const product = products.find((p) => p.id == id)

    const [fetchedProduct, setFetchedProduct] = useState([])

    useEffect(() => {

        async function fetchProducts(){
          try {
            const { data } = await axios.get(`http://127.0.0.1:8000/api/products/${product.id}`);
            setProducts(data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        }
    
        setFetchedProduct()
    
      }, [])

  return (
    <div>
        <Link to="/" className='btn btn-light my-3'>Go Back</Link>
        <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid></Image>
            </Col>
            <Col md={3}>
                <ListGroup variant='flush'>

                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} >
                        </Rating>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        Price: {product.price}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        Description: {product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>

            <Col md={3}>
                <ListGroup variant='flush'>

                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Price:
                            </Col>
                            <Col>   
                                <strong>${product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Status:
                            </Col>
                            <Col>   
                                {product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                        <Button className='btn-block' disabled={product.countInStock == 0} type='button'>Add to cart</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
        {product.name}
      Product
    </div>
  )
}

export default ProductScreen

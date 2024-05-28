import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Col, Row, ListGroup, Image, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';

import { getOrderDetail } from '../slices/orderSlice';

function OrderScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
const orderDetail = useSelector((state) => state.order.orderDetail);
console.log("ORDER DETAIL",orderDetail)


useEffect(() => {
    console.log('ID from useParams:', id);
    if (id && !orderDetail || orderDetail.id !== Number(id)) {
      dispatch(getOrderDetail({ id }));
    }
  }, [dispatch, id, orderDetail]);

//   if (loading) return <Loader />;
//   if (error) return <Message variant="danger">{error}</Message>;

//   if (!orderDetail) return null;

  // Calculate prices
//   const itemsPrice = parseFloat(orderDetail.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2));
//   const shippingPrice = parseFloat(orderDetail.shippingPrice);
//   const taxPrice = parseFloat(orderDetail.taxPrice);
//   const totalPrice = parseFloat(orderDetail.totalPrice);

  return (
    <div>

      <h1>Order {orderDetail.orderID}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Shipping: </strong>
                {orderDetail.shippingAddress.address}, {orderDetail.shippingAddress.city}, {orderDetail.shippingAddress.postalCode}, {orderDetail.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Payment Method: </strong>
                {orderDetail.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {orderDetail.orderItems.length === 0 ? (
                <Message>Your order is empty.</Message>
              ) : (
                <ListGroup variant='flush'>
                  {orderDetail.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col>
                          <Image src={item.image} alt={item.name} fluid rounded style={{ maxWidth: '100px', maxHeight: '100px' }} />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col>
                          {item.qty} X {item.price}&euro; = {(item.qty * item.price).toFixed(2)}&euro;
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>{orderDetail.itemsPrice}&euro;</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>{orderDetail.shippingPrice}&euro;</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>{orderDetail.taxPrice}&euro;</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>{orderDetail.totalPrice}&euro;</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;


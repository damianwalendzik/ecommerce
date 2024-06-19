import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Col, Row, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import PayPal from '../components/PayPal';

import { getOrderDetail } from '../slices/orderSlice';
function OrderScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderDetail = useSelector((state) => state.order.orderDetail);
  const loading = useSelector((state) => state.order.loading);
  const error = useSelector((state) => state.order.error);

  useEffect(() => {
    console.log('ID from useParams:', id);
    if (id && (!orderDetail || orderDetail.id !== Number(id))) {
      dispatch(getOrderDetail({ id }));
    }
  }, [dispatch, id, orderDetail]);

  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;
  if (!orderDetail) return null;

// PAYPAL CLIENT ID: AXQRaIK134MElmi4JFydESD3i4qQNrZsfzNHCBsUHVj9_SRYJIbhxF3NMhiM7qNxOlV83qJ0XzonKiAx
  return (
    <div>
      <h1>Order {orderDetail.id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong>Name:</strong>{orderDetail.user?.name}</p>
              <p><strong>Email:</strong><a href={`mailto:${orderDetail.user?.email}`}>{orderDetail.user?.email}</a></p>
              <p>
                <strong>Shipping: </strong>
                {orderDetail.shippingAddress?.address}, {orderDetail.shippingAddress?.city}, {orderDetail.shippingAddress?.postalCode}, {orderDetail.shippingAddress?.country}
              </p>
                {/* {orderDetail.isDelivered ? (
                <Message variant='success'>Delivered on: {orderDetail.DeliveredAt}</Message>
              ) : (
                <Message variant='danger'>Not delivered</Message>
              )} */}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Payment Method: </strong>
                {orderDetail.paymentMethod}
              </p>
              {/* {orderDetail.isPaid ? (
                <Message variant='success'>Paid on: {orderDetail.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not paid</Message>
              )} */}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {orderDetail.orderItems?.length === 0 ? (
                <Message>Your order is empty.</Message>
              ) : (
                <ListGroup variant='flush'>
                  {orderDetail.orderItems?.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col>
                          <Image src={item.image} alt={item.name} fluid rounded style={{ maxWidth: '100px', maxHeight: '100px' }} />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col>
                          {item.qty} x {item.price}€ = {(item.qty * item.price).toFixed(2)}€
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
                  <Col>{orderDetail.itemsPrice}€</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>{orderDetail.shippingPrice}€</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>{orderDetail.taxPrice}€</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>{orderDetail.totalPrice}€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroupItem>
                <PayPal />
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;

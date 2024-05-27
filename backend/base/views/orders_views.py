from django.shortcuts import render
from django.http import JsonResponse
from base.models import Product, Order, ShippingAddress, OrderItem
from django.contrib.auth.hashers import make_password
from rest_framework import status
from base.serializers import ProductSerializer, OrderSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    print(request.headers)
    data = request.data['input']
    print(f"data: {data}")
    cart = data['cart']
    
    if not cart or len(cart) == 0:
        return Response({'detail': 'No order items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # CREATE ORDER
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['TaxPrice'],
            shippingPrice=data['ShippingPrice'],
            totalPrice=data['TotalPrice']
        )
        
        # CREATE SHIPPING ADDRESS
        shippingAddress = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )
        
        # CREATE ORDER ITEMS AND SET RELATIONSHIP WITH THE PRODUCT & ORDER
        for cart_item in cart:
            product = Product.objects.get(id=cart_item['product'])
            order_item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=cart_item['quantity'],
                price=cart_item['price'],
                image=product.image.url,
            )
            # UPDATE PRODUCT STOCK
            product.countInStock -= order_item.qty
            product.save()
        
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)

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
    data = request.data['input']
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
        response_data = serializer.data
        response_data['orderID'] = order.id
        print(response_data)
        return Response(response_data)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user
    order = Order.objects.get(id=pk)
    try:
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            print(serializer.data)
            return Response(serializer.data)
        else:
            Response({'detail': 'not authorized to view this order'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)
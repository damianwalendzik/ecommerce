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
# @permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    cart = data['cart']
    
    if cart and len(cart) == 0:
        return Response({'detail': 'No order items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
    #console.log("cart", cart) - OK?
    # console.log("shippingAddress", shippingAddress) - OK?
    # console.log("paymentMethod", paymentMethod) OK
    # console.log("ItemsPrice", ItemsPrice) ?
    # console.log("TaxPrice", TaxPrice) OK
    # console.log("TotalPrice", TotalPrice) OK
        #CREATE ORDER
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )
        
        #CREATE SHIPPING ADDRESS
        shippingAddress = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )
        #CREATE ORDER ITEMS AND SET RELATIONSHIP WITH THE PRODUCT & ORDER

        for order in cart:
            product = Product.objects.get(id=order['product'])
            item = OrderItem.objects.create(
                                            product=product,
                                            order=order,
                                            name=product.name,
                                            qty=order['quantity'],
                                            price=order['price'],
                                            image=product.image.url,
                                            )
        #UPDATE PRODUCT STOCK
        product.countInStock -= item.qty
        product.save()

        serializer = OrderSerializer(order, many=True)
        return Response(serializer.data)
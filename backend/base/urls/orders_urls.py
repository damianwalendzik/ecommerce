from django.urls import path
from base.views import orders_views
urlpatterns = [
    path('add/', orders_views.addOrderItems, name='add-order'),
    path('myorders/', orders_views.getMyOrders, name='my-orders'),

    path('<str:pk>/', orders_views.getOrderById, name='view-order'),
    path('<str:pk>/pay/', orders_views.updateOrderToPaid, name='pay-order')
]
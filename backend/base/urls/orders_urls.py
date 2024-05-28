from django.urls import path
from base.views import orders_views
urlpatterns = [
    path('add/', orders_views.addOrderItems, name='add-order'),
    path('<str:pk>/', orders_views.getOrderById, name='view-order')

]
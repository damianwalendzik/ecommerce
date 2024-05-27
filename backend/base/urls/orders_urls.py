from django.urls import path
from base.views import orders_views
urlpatterns = [
    path('add/', orders_views.addOrderItems, name='add-order')
]
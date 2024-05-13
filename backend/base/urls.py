from django.urls import path
from . import views
urlpatterns = [
    path('', views.get_route),
    path('products/', views.getProducts),
    path('products/<str:pk>', views.getProduct),

]

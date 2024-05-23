from django.urls import path
from base.views import users_views
urlpatterns = [
    path('', users_views.getUsers, name='users'),
    path('register/', users_views.registerUser, name='register'),
    path('profile/', users_views.getUserProfile, name="users-profile"),


]
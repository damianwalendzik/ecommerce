from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from base.views.users_views import CustomTokenObtainPairView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', include('base.urls.product_urls')),
    path('api/users/', include('base.urls.users_urls')),
    path('api/orders/', include('base.urls.orders_urls')),

    path('api/users/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/users/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
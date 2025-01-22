from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import RegisterView, LoginView, MenuListView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path('signin/', LoginView.as_view(), name='login'),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path('menu/', MenuListView.as_view(), name='menu-list'),
]

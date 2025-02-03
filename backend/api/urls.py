from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import RegisterView, LoginView, MenuListView, UserInfoView, UploadPictureView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path('signin/', LoginView.as_view(), name='login'),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path('menu/', MenuListView.as_view(), name='menu-list'),
    path('user-info/', UserInfoView.as_view(), name='user-info'),
    path('upload-picture/', UploadPictureView.as_view(), name='upload-picture'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

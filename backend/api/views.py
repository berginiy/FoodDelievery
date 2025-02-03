# views.py (Django)
from django.contrib.auth import authenticate
from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView

from api.models import MenuItem
from api.serializers import MenuItemSerializer, UserSerializer


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if not username or not email or not password:
            return Response({"errors": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"errors": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password)
        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    def post(self, request):
        username_or_email = request.data.get("username")
        password = request.data.get("password")

        try:
            user = User.objects.get(email=username_or_email)
        except User.DoesNotExist:
            user = None

        if not user:
            user = authenticate(username=username_or_email, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                "token": str(refresh.access_token),
                "refresh": str(refresh)
            }, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class CustomTokenRefreshView(TokenRefreshView):
    """
    Кастомное представление для обновления токена.
    """

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            return Response({
                "access": response.data.get("access"),
                "message": "Token refreshed successfully",
            }, status=status.HTTP_200_OK)
        return Response({"error": "Invalid refresh token"}, status=status.HTTP_400_BAD_REQUEST)


class MenuListView(APIView):
    def get(self, request, *args, **kwargs):
        menu_items = MenuItem.objects.all()
        serialized_data = MenuItemSerializer(menu_items, many=True).data
        return Response(serialized_data)


class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]  # Только для авторизованных пользователей

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)


class UploadPictureView(APIView):
    permission_classes = [IsAuthenticated]  # Только для авторизованных пользователей
    parser_classes = [MultiPartParser]  # Для обработки загрузки файлов

    def post(self, request):
        user = request.user
        picture = request.FILES.get('profile_picture')

        if picture:
            user.profile_picture = picture
            user.save()
            return Response({'message': 'Фото успешно загружено.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Файл не загружен.'}, status=status.HTTP_400_BAD_REQUEST)

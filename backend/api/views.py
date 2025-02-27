# api/views.py
from django.contrib.auth import authenticate, get_user_model
from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework import generics
from .models import Order, MenuItem, CustomUser
from .serializers import RegisterSerializer, MenuItemSerializer, UserSerializer, OrderSerializer

# Получаем модель пользователя
User = get_user_model()


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        """
        Регистрация нового пользователя.
        Ожидает: username, email, password.
        """
        data = request.data
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if not all([username, email, password]):
            return Response({"errors": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

        if CustomUser.objects.filter(username=username).exists():
            return Response({"errors": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        if CustomUser.objects.filter(email=email).exists():
            return Response({"errors": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.create_user(
                username=username,
                email=email,
                password=password
            )
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"errors": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        """
        Аутентификация пользователя по username или email.
        Ожидает: username (или email), password.
        """
        username_or_email = request.data.get("username")  # Можно использовать email или username
        password = request.data.get("password")

        try:
            # Пробуем найти пользователя по email, если это email
            if '@' in username_or_email:
                user = CustomUser.objects.filter(email=username_or_email).first()
                if user:
                    username = user.username
                else:
                    username = username_or_email
            else:
                username = username_or_email

            user = authenticate(request, username=username, password=password)

            if user is not None:
                refresh = RefreshToken.for_user(user)
                return Response({
                    "token": str(refresh.access_token),
                    "refresh": str(refresh)
                }, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
        """
        Возвращает список всех блюд из меню.
        """
        menu_items = MenuItem.objects.all()
        serialized_data = MenuItemSerializer(menu_items, many=True).data
        return Response(serialized_data, status=status.HTTP_200_OK)


class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Возвращает информацию о текущем авторизованном пользователе.
        """
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UploadPictureView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser]

    def post(self, request):
        """
        Загружает фотографию профиля для авторизованного пользователя.
        """
        user = request.user
        picture = request.FILES.get('profile_picture')

        if picture:
            user.profile_picture = picture
            user.save()
            return Response({'message': 'Фото успешно загружено.'}, status=status.HTTP_200_OK)
        return Response({'error': 'Файл не загружен.'}, status=status.HTTP_400_BAD_REQUEST)


class OrderCreateView(generics.CreateAPIView):
    """
    Создание нового заказа.
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]  # Добавим авторизацию для безопасности


class MenuItemDetailView(generics.RetrieveAPIView):
    """
    Возвращает детали конкретного блюда по ID.
    """
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    lookup_field = 'id'
    permission_classes = [AllowAny]  # Доступно всем, если не требуется авторизация

import os
from pathlib import Path

# Путь к проекту
BASE_DIR = Path(__file__).resolve().parent.parent

# Безопасность
SECRET_KEY = 'your-secret-key'  # Замените на ваш секретный ключ
DEBUG = True
ALLOWED_HOSTS = ['*']  # Разрешаем доступ с любых хостов, можно уточнить позже для продакшн

# Приложения, установленные в проекте
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    'rest_framework',
    'corsheaders',
    'api',
]

# Средства безопасности
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Добавляем middleware для работы с CORS
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# Базовые настройки URL
ROOT_URLCONF = 'backend.urls'

# Шаблоны
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],  # Путь к папке с шаблонами
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# База данных
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Параметры авторизации
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Международные настройки
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Статические файлы
STATIC_URL = 'static/'

# Разрешение CORS
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Фронтенд на порту 5173
]

# Разрешенные методы для CORS (опционально)
CORS_ALLOW_METHODS = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
]

# Маршруты для API
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}

# Настройки для файлов (например, медиа)
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Разрешение использования статических файлов в режиме разработки
STATICFILES_DIRS = [
    BASE_DIR / "static",
]

# Разрешение работы с запросами без аутентификации CSRF в API
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5173",  # фронтенд
]

# Разрешение использования всех источников для CORS (если нужно)
CORS_ALLOW_ALL_ORIGINS = False  # Важно установить False, если не нужно разрешать все источники для безопасности

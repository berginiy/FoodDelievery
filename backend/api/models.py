from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    phone = models.CharField(max_length=15, blank=True, null=True)

    # Указываем уникальные имена для обратных связей
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_groups',  # Уникальное имя для обратной связи
        blank=True,
        help_text='The groups this user belongs to.',
        related_query_name='customuser'
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_permissions',  # Уникальное имя для обратной связи
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='customuser'
    )

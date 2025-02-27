from django.contrib.auth.models import AbstractUser, User
from django.db import models


class CustomUser(AbstractUser):
    phone = models.CharField(max_length=15, blank=True, null=True)

    email = models.EmailField(unique=True)

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_groups',
        blank=True,
        help_text='The groups this user belongs to.',
        related_query_name='customuser'
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='customuser'
    )


class MenuItem(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название блюда")
    description = models.TextField(verbose_name="Описание блюда", blank=True, null=True)
    price = models.DecimalField(max_digits=6, decimal_places=2, verbose_name="Цена")
    image = models.ImageField(upload_to="menu_images/", verbose_name="Картинка блюда", blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Пункт меню"
        verbose_name_plural = "Меню"


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}'s profile"


class Dish(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()


class Order(models.Model):
    customer_name = models.CharField(max_length=255)
    address = models.TextField()
    notes = models.TextField(blank=True, null=True)
    dish = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

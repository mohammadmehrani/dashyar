from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    USER_TYPE_CHOICES = [
        ('admin', _('Admin')),
        ('staff', _('Staff')),
        ('customer', _('Customer')),
    ]
    
    email = models.EmailField(_('email address'), unique=True)
    phone = models.CharField(_('phone number'), max_length=20, blank=True)
    avatar = models.ImageField(_('avatar'), upload_to='avatars/', blank=True, null=True)
    user_type = models.CharField(_('user type'), max_length=20, choices=USER_TYPE_CHOICES, default='customer')
    company_name = models.CharField(_('company name'), max_length=200, blank=True)
    is_verified = models.BooleanField(_('verified'), default=False)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)
    
    # Language preference
    LANGUAGE_CHOICES = [
        ('fa', _('Persian')),
        ('en', _('English')),
    ]
    preferred_language = models.CharField(_('preferred language'), max_length=2, choices=LANGUAGE_CHOICES, default='fa')
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']
    
    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('Users')
        ordering = ['-created_at']
    
    def __str__(self):
        return self.email
    
    @property
    def is_admin(self):
        return self.user_type == 'admin'
    
    @property
    def is_staff_user(self):
        return self.user_type in ['admin', 'staff']


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(_('bio'), blank=True)
    address = models.TextField(_('address'), blank=True)
    city = models.CharField(_('city'), max_length=100, blank=True)
    country = models.CharField(_('country'), max_length=100, blank=True)
    postal_code = models.CharField(_('postal code'), max_length=20, blank=True)
    website = models.URLField(_('website'), blank=True)
    linkedin = models.URLField(_('linkedin'), blank=True)
    twitter = models.URLField(_('twitter'), blank=True)
    
    class Meta:
        verbose_name = _('User Profile')
        verbose_name_plural = _('User Profiles')
    
    def __str__(self):
        return f"{self.user.email} Profile"

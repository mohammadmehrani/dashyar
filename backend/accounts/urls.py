from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('profile/', views.UserProfileView.as_view(), name='profile'),
    path('profile/update/', views.UserUpdateView.as_view(), name='profile-update'),
    path('password/change/', views.PasswordChangeView.as_view(), name='password-change'),
    path('stats/', views.get_user_stats, name='user-stats'),
    path('language/toggle/', views.toggle_language, name='toggle-language'),
]

from django.urls import path
from . import views

urlpatterns = [
    # Public endpoints
    path('content/', views.get_site_content, name='site-content'),
    path('hero/', views.HeroSectionListView.as_view(), name='hero-list'),
    path('services/', views.ServiceListView.as_view(), name='service-list'),
    path('team/', views.TeamMemberListView.as_view(), name='team-list'),
    path('about/', views.AboutSectionView.as_view(), name='about-list'),
    path('contact-info/', views.ContactInfoView.as_view(), name='contact-info'),
    path('contact/', views.ContactMessageCreateView.as_view(), name='contact-create'),
    
    # Admin endpoints
    path('admin/settings/', views.SiteSettingListCreateView.as_view(), name='setting-list-create'),
    path('admin/settings/<str:key>/', views.SiteSettingDetailView.as_view(), name='setting-detail'),
    
    path('admin/hero/', views.HeroSectionCreateView.as_view(), name='hero-create'),
    path('admin/hero/<int:pk>/', views.HeroSectionDetailView.as_view(), name='hero-detail'),
    
    path('admin/services/', views.ServiceCreateView.as_view(), name='service-create'),
    path('admin/services/<int:pk>/', views.ServiceDetailView.as_view(), name='service-detail'),
    
    path('admin/team/', views.TeamMemberCreateView.as_view(), name='team-create'),
    path('admin/team/<int:pk>/', views.TeamMemberDetailView.as_view(), name='team-detail'),
    
    path('admin/about/', views.AboutSectionCreateView.as_view(), name='about-create'),
    path('admin/about/<int:pk>/', views.AboutSectionDetailView.as_view(), name='about-detail'),
    
    path('admin/messages/', views.ContactMessageListView.as_view(), name='message-list'),
    path('admin/messages/<int:pk>/', views.ContactMessageDetailView.as_view(), name='message-detail'),
]

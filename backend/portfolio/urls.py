from django.urls import path
from . import views

urlpatterns = [
    # Public endpoints
    path('categories/', views.ProjectCategoryListView.as_view(), name='category-list'),
    path('projects/', views.ProjectListView.as_view(), name='project-list'),
    path('projects/featured/', views.FeaturedProjectsView.as_view(), name='featured-projects'),
    path('projects/<slug:slug>/', views.ProjectDetailView.as_view(), name='project-detail'),
    path('projects/<slug:slug>/related/', views.get_related_projects, name='related-projects'),
    path('projects/<slug:project_slug>/testimonials/', views.ProjectTestimonialListView.as_view(), name='project-testimonials'),
    
    # Stats endpoint
    path('stats/', views.get_portfolio_stats, name='portfolio-stats'),
    
    # Admin endpoints
    path('admin/categories/', views.ProjectCategoryCreateView.as_view(), name='admin-category-create'),
    path('admin/categories/<slug:slug>/', views.ProjectCategoryDetailView.as_view(), name='admin-category-detail'),
    
    path('admin/projects/', views.ProjectCreateView.as_view(), name='admin-project-create'),
    path('admin/projects/<int:pk>/', views.ProjectDetailAdminView.as_view(), name='admin-project-detail'),
    
    path('admin/testimonials/', views.ProjectTestimonialCreateView.as_view(), name='admin-testimonial-create'),
    path('admin/testimonials/<int:pk>/', views.ProjectTestimonialDetailView.as_view(), name='admin-testimonial-detail'),
]

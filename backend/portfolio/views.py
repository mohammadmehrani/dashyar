from rest_framework import generics, permissions, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import ProjectCategory, Project, ProjectTestimonial
from .serializers import (
    ProjectCategorySerializer, 
    ProjectListSerializer, 
    ProjectDetailSerializer,
    ProjectCreateUpdateSerializer,
    ProjectTestimonialSerializer
)


# Public Views

class ProjectCategoryListView(generics.ListAPIView):
    """List all active project categories"""
    queryset = ProjectCategory.objects.filter(is_active=True)
    serializer_class = ProjectCategorySerializer
    permission_classes = [permissions.AllowAny]


class ProjectListView(generics.ListAPIView):
    """List all active projects with filtering"""
    serializer_class = ProjectListSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title_fa', 'title_en', 'description_fa', 'description_en', 'technologies']
    ordering_fields = ['created_at', 'views_count', 'order']
    ordering = ['-is_featured', '-created_at']
    
    def get_queryset(self):
        queryset = Project.objects.filter(is_active=True)
        
        # Filter by category
        category_slug = self.request.query_params.get('category')
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        
        # Filter by status
        status = self.request.query_params.get('status')
        if status:
            queryset = queryset.filter(status=status)
        
        # Filter by featured
        featured = self.request.query_params.get('featured')
        if featured == 'true':
            queryset = queryset.filter(is_featured=True)
        
        # Filter by technology
        tech = self.request.query_params.get('tech')
        if tech:
            queryset = queryset.filter(technologies__contains=[tech])
        
        return queryset


class ProjectDetailView(generics.RetrieveAPIView):
    """Get project details"""
    queryset = Project.objects.filter(is_active=True)
    serializer_class = ProjectDetailSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.increment_views()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class FeaturedProjectsView(generics.ListAPIView):
    """Get featured projects"""
    serializer_class = ProjectListSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        return Project.objects.filter(is_active=True, is_featured=True)


# Admin Views

class ProjectCategoryCreateView(generics.CreateAPIView):
    """Create project category (admin only)"""
    queryset = ProjectCategory.objects.all()
    serializer_class = ProjectCategorySerializer
    permission_classes = [permissions.IsAdminUser]


class ProjectCategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Manage project category (admin only)"""
    queryset = ProjectCategory.objects.all()
    serializer_class = ProjectCategorySerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_field = 'slug'


class ProjectCreateView(generics.CreateAPIView):
    """Create project (admin only)"""
    queryset = Project.objects.all()
    serializer_class = ProjectCreateUpdateSerializer
    permission_classes = [permissions.IsAdminUser]


class ProjectDetailAdminView(generics.RetrieveUpdateDestroyAPIView):
    """Manage project (admin only)"""
    queryset = Project.objects.all()
    serializer_class = ProjectCreateUpdateSerializer
    permission_classes = [permissions.IsAdminUser]


class ProjectTestimonialListView(generics.ListAPIView):
    """List testimonials for a project"""
    serializer_class = ProjectTestimonialSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        project_slug = self.kwargs.get('project_slug')
        project = get_object_or_404(Project, slug=project_slug)
        return project.testimonials.filter(is_active=True)


class ProjectTestimonialCreateView(generics.CreateAPIView):
    """Create testimonial (admin only)"""
    queryset = ProjectTestimonial.objects.all()
    serializer_class = ProjectTestimonialSerializer
    permission_classes = [permissions.IsAdminUser]


class ProjectTestimonialDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Manage testimonial (admin only)"""
    queryset = ProjectTestimonial.objects.all()
    serializer_class = ProjectTestimonialSerializer
    permission_classes = [permissions.IsAdminUser]


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def get_portfolio_stats(request):
    """Get portfolio statistics"""
    total_projects = Project.objects.filter(is_active=True).count()
    completed_projects = Project.objects.filter(is_active=True, status='completed').count()
    in_progress_projects = Project.objects.filter(is_active=True, status='in_progress').count()
    featured_projects = Project.objects.filter(is_active=True, is_featured=True).count()
    categories_count = ProjectCategory.objects.filter(is_active=True).count()
    
    return Response({
        'total_projects': total_projects,
        'completed_projects': completed_projects,
        'in_progress_projects': in_progress_projects,
        'featured_projects': featured_projects,
        'categories_count': categories_count,
    })


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def get_related_projects(request, slug):
    """Get related projects"""
    project = get_object_or_404(Project, slug=slug, is_active=True)
    
    # Get projects in the same category, excluding current project
    related = Project.objects.filter(
        category=project.category,
        is_active=True
    ).exclude(id=project.id)[:4]
    
    # If not enough, add projects with similar technologies
    if len(related) < 4 and project.technologies:
        tech_related = Project.objects.filter(
            technologies__overlap=project.technologies,
            is_active=True
        ).exclude(id=project.id).exclude(id__in=[p.id for p in related])[:4-len(related)]
        related = list(related) + list(tech_related)
    
    serializer = ProjectListSerializer(related, many=True)
    return Response(serializer.data)

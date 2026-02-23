from rest_framework import serializers
from .models import ProjectCategory, Project, ProjectTestimonial


class ProjectCategorySerializer(serializers.ModelSerializer):
    project_count = serializers.SerializerMethodField()
    
    class Meta:
        model = ProjectCategory
        fields = ['id', 'name_fa', 'name_en', 'slug', 'icon', 'order', 'is_active', 'project_count']
    
    def get_project_count(self, obj):
        return obj.projects.filter(is_active=True).count()


class ProjectTestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectTestimonial
        fields = ['id', 'client_name', 'client_position', 'client_company', 
                  'client_photo', 'content_fa', 'content_en', 'rating', 'created_at']


class ProjectListSerializer(serializers.ModelSerializer):
    category = ProjectCategorySerializer(read_only=True)
    
    class Meta:
        model = Project
        fields = ['id', 'title_fa', 'title_en', 'slug', 'short_description_fa', 
                  'short_description_en', 'category', 'featured_image', 'technologies',
                  'status', 'is_featured', 'views_count', 'created_at']


class ProjectDetailSerializer(serializers.ModelSerializer):
    category = ProjectCategorySerializer(read_only=True)
    testimonials = ProjectTestimonialSerializer(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = ['id', 'title_fa', 'title_en', 'slug', 'description_fa', 'description_en',
                  'short_description_fa', 'short_description_en', 'category', 
                  'featured_image', 'gallery', 'client_name', 'project_url', 'github_url',
                  'technologies', 'features_fa', 'features_en', 'status', 
                  'start_date', 'completion_date', 'is_featured', 'views_count',
                  'testimonials', 'created_at', 'updated_at']


class ProjectCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['title_fa', 'title_en', 'slug', 'description_fa', 'description_en',
                  'short_description_fa', 'short_description_en', 'category', 
                  'featured_image', 'gallery', 'client_name', 'project_url', 'github_url',
                  'technologies', 'features_fa', 'features_en', 'status', 
                  'start_date', 'completion_date', 'is_featured', 'is_active', 'order']

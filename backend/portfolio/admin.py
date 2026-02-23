from django.contrib import admin
from .models import ProjectCategory, Project, ProjectTestimonial


class ProjectTestimonialInline(admin.TabularInline):
    model = ProjectTestimonial
    extra = 0
    readonly_fields = ['created_at']


@admin.register(ProjectCategory)
class ProjectCategoryAdmin(admin.ModelAdmin):
    list_display = ['name_fa', 'slug', 'is_active', 'order', 'project_count']
    list_filter = ['is_active']
    search_fields = ['name_fa', 'name_en', 'slug']
    ordering = ['order', 'name_fa']
    prepopulated_fields = {'slug': ('name_en',)}
    
    def project_count(self, obj):
        return obj.projects.count()
    project_count.short_description = 'Projects'


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title_fa', 'category', 'status', 'is_featured', 'is_active', 'views_count', 'created_at']
    list_filter = ['status', 'is_featured', 'is_active', 'category', 'created_at']
    search_fields = ['title_fa', 'title_en', 'description_fa', 'description_en', 'client_name']
    ordering = ['-is_featured', 'order', '-created_at']
    prepopulated_fields = {'slug': ('title_en',)}
    inlines = [ProjectTestimonialInline]
    readonly_fields = ['views_count', 'created_at', 'updated_at']
    fieldsets = (
        ('Basic Information', {
            'fields': ('title_fa', 'title_en', 'slug', 'category', 'status')
        }),
        ('Descriptions', {
            'fields': ('short_description_fa', 'short_description_en', 'description_fa', 'description_en')
        }),
        ('Media', {
            'fields': ('featured_image', 'gallery')
        }),
        ('Links', {
            'fields': ('client_name', 'project_url', 'github_url')
        }),
        ('Details', {
            'fields': ('technologies', 'features_fa', 'features_en')
        }),
        ('Dates', {
            'fields': ('start_date', 'completion_date')
        }),
        ('Settings', {
            'fields': ('is_featured', 'is_active', 'order')
        }),
        ('Statistics', {
            'fields': ('views_count', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(ProjectTestimonial)
class ProjectTestimonialAdmin(admin.ModelAdmin):
    list_display = ['client_name', 'project', 'rating', 'is_active', 'created_at']
    list_filter = ['rating', 'is_active', 'created_at']
    search_fields = ['client_name', 'client_company', 'content_fa', 'content_en']
    readonly_fields = ['created_at']

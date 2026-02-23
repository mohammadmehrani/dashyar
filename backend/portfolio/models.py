from django.db import models
from django.utils.translation import gettext_lazy as _


class ProjectCategory(models.Model):
    """Project categories"""
    name_fa = models.CharField(_('name (Persian)'), max_length=100)
    name_en = models.CharField(_('name (English)'), max_length=100)
    slug = models.SlugField(_('slug'), unique=True)
    icon = models.CharField(_('icon class'), max_length=100, blank=True)
    order = models.PositiveIntegerField(_('order'), default=0)
    is_active = models.BooleanField(_('is active'), default=True)
    
    class Meta:
        verbose_name = _('Project Category')
        verbose_name_plural = _('Project Categories')
        ordering = ['order', 'name_fa']
    
    def __str__(self):
        return self.name_fa


class Project(models.Model):
    """Portfolio projects"""
    STATUS_CHOICES = [
        ('completed', _('Completed')),
        ('in_progress', _('In Progress')),
        ('planned', _('Planned')),
    ]
    
    title_fa = models.CharField(_('title (Persian)'), max_length=200)
    title_en = models.CharField(_('title (English)'), max_length=200)
    slug = models.SlugField(_('slug'), unique=True)
    description_fa = models.TextField(_('description (Persian)'))
    description_en = models.TextField(_('description (English)'))
    short_description_fa = models.CharField(_('short description (Persian)'), max_length=300)
    short_description_en = models.CharField(_('short description (English)'), max_length=300)
    
    category = models.ForeignKey(
        ProjectCategory, 
        on_delete=models.CASCADE, 
        related_name='projects',
        verbose_name=_('category')
    )
    
    featured_image = models.ImageField(_('featured image'), upload_to='projects/')
    gallery = models.JSONField(_('gallery images'), default=list, blank=True)
    
    client_name = models.CharField(_('client name'), max_length=200, blank=True)
    project_url = models.URLField(_('project URL'), blank=True)
    github_url = models.URLField(_('GitHub URL'), blank=True)
    
    technologies = models.JSONField(_('technologies used'), default=list, blank=True)
    features_fa = models.JSONField(_('features (Persian)'), default=list, blank=True)
    features_en = models.JSONField(_('features (English)'), default=list, blank=True)
    
    status = models.CharField(_('status'), max_length=20, choices=STATUS_CHOICES, default='completed')
    start_date = models.DateField(_('start date'), blank=True, null=True)
    completion_date = models.DateField(_('completion date'), blank=True, null=True)
    
    is_featured = models.BooleanField(_('is featured'), default=False)
    is_active = models.BooleanField(_('is active'), default=True)
    order = models.PositiveIntegerField(_('order'), default=0)
    views_count = models.PositiveIntegerField(_('views count'), default=0)
    
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)
    
    class Meta:
        verbose_name = _('Project')
        verbose_name_plural = _('Projects')
        ordering = ['-is_featured', 'order', '-created_at']
    
    def __str__(self):
        return self.title_fa
    
    def increment_views(self):
        self.views_count += 1
        self.save(update_fields=['views_count'])


class ProjectTestimonial(models.Model):
    """Client testimonials for projects"""
    project = models.ForeignKey(
        Project, 
        on_delete=models.CASCADE, 
        related_name='testimonials',
        verbose_name=_('project')
    )
    client_name = models.CharField(_('client name'), max_length=200)
    client_position = models.CharField(_('client position'), max_length=200, blank=True)
    client_company = models.CharField(_('client company'), max_length=200, blank=True)
    client_photo = models.ImageField(_('client photo'), upload_to='testimonials/', blank=True, null=True)
    content_fa = models.TextField(_('content (Persian)'))
    content_en = models.TextField(_('content (English)'))
    rating = models.PositiveSmallIntegerField(_('rating'), default=5)
    is_active = models.BooleanField(_('is active'), default=True)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    
    class Meta:
        verbose_name = _('Project Testimonial')
        verbose_name_plural = _('Project Testimonials')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.client_name} - {self.project.title_fa}"

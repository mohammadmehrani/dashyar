from django.db import models
from django.utils.translation import gettext_lazy as _


class SiteSetting(models.Model):
    """Global site settings"""
    key = models.CharField(_('key'), max_length=100, unique=True)
    value = models.TextField(_('value'))
    description = models.CharField(_('description'), max_length=255, blank=True)
    
    class Meta:
        verbose_name = _('Site Setting')
        verbose_name_plural = _('Site Settings')
    
    def __str__(self):
        return self.key


class HeroSection(models.Model):
    """Hero section content"""
    title_fa = models.CharField(_('title (Persian)'), max_length=200)
    title_en = models.CharField(_('title (English)'), max_length=200)
    subtitle_fa = models.TextField(_('subtitle (Persian)'))
    subtitle_en = models.TextField(_('subtitle (English)'))
    background_image = models.ImageField(_('background image'), upload_to='hero/', blank=True, null=True)
    cta_button_text_fa = models.CharField(_('CTA button text (Persian)'), max_length=100, default='مشاهده خدمات')
    cta_button_text_en = models.CharField(_('CTA button text (English)'), max_length=100, default='View Services')
    cta_button_link = models.CharField(_('CTA button link'), max_length=200, default='#services')
    secondary_button_text_fa = models.CharField(_('secondary button text (Persian)'), max_length=100, default='درخواست همکاری')
    secondary_button_text_en = models.CharField(_('secondary button text (English)'), max_length=100, default='Request Collaboration')
    secondary_button_link = models.CharField(_('secondary button link'), max_length=200, default='#contact')
    is_active = models.BooleanField(_('is active'), default=True)
    order = models.PositiveIntegerField(_('order'), default=0)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    
    class Meta:
        verbose_name = _('Hero Section')
        verbose_name_plural = _('Hero Sections')
        ordering = ['order', '-created_at']
    
    def __str__(self):
        return self.title_fa


class Service(models.Model):
    """Services offered"""
    title_fa = models.CharField(_('title (Persian)'), max_length=200)
    title_en = models.CharField(_('title (English)'), max_length=200)
    description_fa = models.TextField(_('description (Persian)'))
    description_en = models.TextField(_('description (English)'))
    icon = models.CharField(_('icon class'), max_length=100, default='code')
    image = models.ImageField(_('image'), upload_to='services/', blank=True, null=True)
    technologies = models.JSONField(_('technologies'), default=list, blank=True)
    features_fa = models.JSONField(_('features (Persian)'), default=list, blank=True)
    features_en = models.JSONField(_('features (English)'), default=list, blank=True)
    code_snippet = models.TextField(_('code snippet'), blank=True)
    is_active = models.BooleanField(_('is active'), default=True)
    order = models.PositiveIntegerField(_('order'), default=0)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    
    class Meta:
        verbose_name = _('Service')
        verbose_name_plural = _('Services')
        ordering = ['order', '-created_at']
    
    def __str__(self):
        return self.title_fa


class TeamMember(models.Model):
    """Team members"""
    name_fa = models.CharField(_('name (Persian)'), max_length=200)
    name_en = models.CharField(_('name (English)'), max_length=200)
    position_fa = models.CharField(_('position (Persian)'), max_length=200)
    position_en = models.CharField(_('position (English)'), max_length=200)
    bio_fa = models.TextField(_('bio (Persian)'), blank=True)
    bio_en = models.TextField(_('bio (English)'), blank=True)
    photo = models.ImageField(_('photo'), upload_to='team/', blank=True, null=True)
    skills = models.JSONField(_('skills'), default=list, blank=True)
    experience_years = models.PositiveIntegerField(_('experience years'), default=0)
    projects_count = models.PositiveIntegerField(_('projects count'), default=0)
    email = models.EmailField(_('email'), blank=True)
    linkedin = models.URLField(_('linkedin'), blank=True)
    twitter = models.URLField(_('twitter'), blank=True)
    is_active = models.BooleanField(_('is active'), default=True)
    order = models.PositiveIntegerField(_('order'), default=0)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    
    class Meta:
        verbose_name = _('Team Member')
        verbose_name_plural = _('Team Members')
        ordering = ['order', '-created_at']
    
    def __str__(self):
        return self.name_fa


class AboutSection(models.Model):
    """About section content"""
    title_fa = models.CharField(_('title (Persian)'), max_length=200)
    title_en = models.CharField(_('title (English)'), max_length=200)
    description_fa = models.TextField(_('description (Persian)'))
    description_en = models.TextField(_('description (English)'))
    image = models.ImageField(_('image'), upload_to='about/', blank=True, null=True)
    video_url = models.URLField(_('video URL'), blank=True)
    
    # Statistics
    projects_completed = models.PositiveIntegerField(_('projects completed'), default=0)
    happy_clients = models.PositiveIntegerField(_('happy clients'), default=0)
    awards_won = models.PositiveIntegerField(_('awards won'), default=0)
    years_experience = models.PositiveIntegerField(_('years experience'), default=0)
    
    is_active = models.BooleanField(_('is active'), default=True)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    
    class Meta:
        verbose_name = _('About Section')
        verbose_name_plural = _('About Sections')
    
    def __str__(self):
        return self.title_fa


class ContactInfo(models.Model):
    """Contact information"""
    email = models.EmailField(_('email'))
    phone1 = models.CharField(_('phone 1'), max_length=20)
    phone2 = models.CharField(_('phone 2'), max_length=20, blank=True)
    address_fa = models.TextField(_('address (Persian)'))
    address_en = models.TextField(_('address (English)'))
    google_maps_url = models.URLField(_('google maps URL'), blank=True)
    
    # Social media
    instagram = models.URLField(_('instagram'), blank=True)
    telegram = models.URLField(_('telegram'), blank=True)
    linkedin = models.URLField(_('linkedin'), blank=True)
    twitter = models.URLField(_('twitter'), blank=True)
    
    is_active = models.BooleanField(_('is active'), default=True)
    
    class Meta:
        verbose_name = _('Contact Info')
        verbose_name_plural = _('Contact Info')
    
    def __str__(self):
        return self.email


class ContactMessage(models.Model):
    """Contact form messages"""
    name = models.CharField(_('name'), max_length=200)
    email = models.EmailField(_('email'))
    phone = models.CharField(_('phone'), max_length=20, blank=True)
    subject = models.CharField(_('subject'), max_length=200)
    message = models.TextField(_('message'))
    is_read = models.BooleanField(_('is read'), default=False)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    
    class Meta:
        verbose_name = _('Contact Message')
        verbose_name_plural = _('Contact Messages')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.subject}"

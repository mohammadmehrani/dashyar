from django.contrib import admin
from .models import (
    SiteSetting, HeroSection, Service, TeamMember, 
    AboutSection, ContactInfo, ContactMessage
)


@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    list_display = ['key', 'value', 'description']
    search_fields = ['key', 'value', 'description']


@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    list_display = ['title_fa', 'is_active', 'order', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title_fa', 'title_en', 'subtitle_fa', 'subtitle_en']
    ordering = ['order', '-created_at']


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title_fa', 'is_active', 'order', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title_fa', 'title_en', 'description_fa', 'description_en']
    ordering = ['order', '-created_at']


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name_fa', 'position_fa', 'is_active', 'order', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name_fa', 'name_en', 'position_fa', 'position_en']
    ordering = ['order', '-created_at']


@admin.register(AboutSection)
class AboutSectionAdmin(admin.ModelAdmin):
    list_display = ['title_fa', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title_fa', 'title_en']


@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ['email', 'phone1', 'is_active']
    list_filter = ['is_active']


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'is_read', 'created_at']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['created_at']
    ordering = ['-created_at']

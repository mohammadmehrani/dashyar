from rest_framework import serializers
from .models import (
    SiteSetting, HeroSection, Service, TeamMember, 
    AboutSection, ContactInfo, ContactMessage
)


class SiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSetting
        fields = ['key', 'value', 'description']


class HeroSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSection
        fields = ['id', 'title_fa', 'title_en', 'subtitle_fa', 'subtitle_en',
                  'background_image', 'cta_button_text_fa', 'cta_button_text_en',
                  'cta_button_link', 'secondary_button_text_fa', 'secondary_button_text_en',
                  'secondary_button_link', 'is_active', 'order']


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'title_fa', 'title_en', 'description_fa', 'description_en',
                  'icon', 'image', 'technologies', 'features_fa', 'features_en',
                  'code_snippet', 'is_active', 'order']


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['id', 'name_fa', 'name_en', 'position_fa', 'position_en',
                  'bio_fa', 'bio_en', 'photo', 'skills', 'experience_years',
                  'projects_count', 'email', 'linkedin', 'twitter', 'is_active', 'order']


class AboutSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutSection
        fields = ['id', 'title_fa', 'title_en', 'description_fa', 'description_en',
                  'image', 'video_url', 'projects_completed', 'happy_clients',
                  'awards_won', 'years_experience', 'is_active']


class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = ['id', 'email', 'phone1', 'phone2', 'address_fa', 'address_en',
                  'google_maps_url', 'instagram', 'telegram', 'linkedin', 'twitter']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'phone', 'subject', 'message', 'is_read', 'created_at']
        read_only_fields = ['is_read', 'created_at']

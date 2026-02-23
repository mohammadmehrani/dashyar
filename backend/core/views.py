from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.utils import translation
from .models import (
    SiteSetting, HeroSection, Service, TeamMember, 
    AboutSection, ContactInfo, ContactMessage
)
from .serializers import (
    SiteSettingSerializer, HeroSectionSerializer, ServiceSerializer,
    TeamMemberSerializer, AboutSectionSerializer, ContactInfoSerializer,
    ContactMessageSerializer
)


# Public views (no authentication required)

class HeroSectionListView(generics.ListAPIView):
    queryset = HeroSection.objects.filter(is_active=True)
    serializer_class = HeroSectionSerializer
    permission_classes = [permissions.AllowAny]


class ServiceListView(generics.ListAPIView):
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]


class TeamMemberListView(generics.ListAPIView):
    queryset = TeamMember.objects.filter(is_active=True)
    serializer_class = TeamMemberSerializer
    permission_classes = [permissions.AllowAny]


class AboutSectionView(generics.ListAPIView):
    queryset = AboutSection.objects.filter(is_active=True)
    serializer_class = AboutSectionSerializer
    permission_classes = [permissions.AllowAny]


class ContactInfoView(generics.ListAPIView):
    queryset = ContactInfo.objects.filter(is_active=True)
    serializer_class = ContactInfoSerializer
    permission_classes = [permissions.AllowAny]


class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]


# Admin views (authentication required)

class SiteSettingListCreateView(generics.ListCreateAPIView):
    queryset = SiteSetting.objects.all()
    serializer_class = SiteSettingSerializer
    permission_classes = [permissions.IsAdminUser]


class SiteSettingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SiteSetting.objects.all()
    serializer_class = SiteSettingSerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_field = 'key'


class HeroSectionCreateView(generics.CreateAPIView):
    queryset = HeroSection.objects.all()
    serializer_class = HeroSectionSerializer
    permission_classes = [permissions.IsAdminUser]


class HeroSectionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = HeroSection.objects.all()
    serializer_class = HeroSectionSerializer
    permission_classes = [permissions.IsAdminUser]


class ServiceCreateView(generics.CreateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.IsAdminUser]


class ServiceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.IsAdminUser]


class TeamMemberCreateView(generics.CreateAPIView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    permission_classes = [permissions.IsAdminUser]


class TeamMemberDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    permission_classes = [permissions.IsAdminUser]


class AboutSectionCreateView(generics.CreateAPIView):
    queryset = AboutSection.objects.all()
    serializer_class = AboutSectionSerializer
    permission_classes = [permissions.IsAdminUser]


class AboutSectionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = AboutSection.objects.all()
    serializer_class = AboutSectionSerializer
    permission_classes = [permissions.IsAdminUser]


class ContactMessageListView(generics.ListAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.IsAdminUser]


class ContactMessageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.IsAdminUser]


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def get_site_content(request):
    """Get all site content for initial load"""
    lang = request.GET.get('lang', 'fa')
    
    hero = HeroSection.objects.filter(is_active=True).first()
    services = Service.objects.filter(is_active=True)
    team = TeamMember.objects.filter(is_active=True)
    about = AboutSection.objects.filter(is_active=True).first()
    contact = ContactInfo.objects.filter(is_active=True).first()
    
    data = {
        'language': lang,
        'hero': HeroSectionSerializer(hero).data if hero else None,
        'services': ServiceSerializer(services, many=True).data,
        'team': TeamMemberSerializer(team, many=True).data,
        'about': AboutSectionSerializer(about).data if about else None,
        'contact': ContactInfoSerializer(contact).data if contact else None,
    }
    
    return Response(data)

from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.utils import timezone
from .models import Conversation, Message, Notification
from .serializers import (
    ConversationSerializer, 
    ConversationCreateSerializer,
    MessageSerializer,
    MessageCreateSerializer,
    NotificationSerializer
)


# User Conversation Views

class UserConversationListView(generics.ListAPIView):
    """List user's conversations"""
    serializer_class = ConversationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Conversation.objects.filter(participant=self.request.user)


class UserConversationCreateView(generics.CreateAPIView):
    """Create new conversation with initial message"""
    serializer_class = ConversationCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class UserConversationDetailView(generics.RetrieveAPIView):
    """Get conversation details"""
    serializer_class = ConversationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Conversation.objects.filter(participant=self.request.user)


class UserMessageListView(generics.ListAPIView):
    """List messages in a conversation"""
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        conversation_id = self.kwargs.get('conversation_id')
        conversation = get_object_or_404(Conversation, id=conversation_id)
        
        # Check permission
        if conversation.participant != self.request.user and not self.request.user.is_staff:
            return Message.objects.none()
        
        return conversation.messages.all()


class UserMessageCreateView(generics.CreateAPIView):
    """Send message in a conversation"""
    serializer_class = MessageCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)


# Admin Conversation Views

class AdminConversationListView(generics.ListAPIView):
    """List all conversations (admin only)"""
    serializer_class = ConversationSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = Conversation.objects.all()


class AdminConversationDetailView(generics.RetrieveAPIView):
    """Get any conversation details (admin only)"""
    serializer_class = ConversationSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = Conversation.objects.all()


class AdminMessageCreateView(generics.CreateAPIView):
    """Admin reply to a conversation"""
    serializer_class = MessageCreateSerializer
    permission_classes = [permissions.IsAdminUser]
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)


# Notification Views

class NotificationListView(generics.ListAPIView):
    """List user notifications"""
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)


class NotificationMarkReadView(generics.UpdateAPIView):
    """Mark notification as read"""
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)
    
    def patch(self, request, *args, **kwargs):
        notification = self.get_object()
        notification.is_read = True
        notification.save()
        return Response(self.get_serializer(notification).data)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def mark_all_notifications_read(request):
    """Mark all notifications as read"""
    Notification.objects.filter(user=request.user, is_read=False).update(is_read=True)
    return Response({'message': 'All notifications marked as read.'})


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def mark_message_read(request, message_id):
    """Mark a message as read"""
    message = get_object_or_404(Message, id=message_id)
    
    # Check permission
    if message.conversation.participant != request.user and not request.user.is_staff:
        return Response({'error': 'Permission denied.'}, status=status.HTTP_403_FORBIDDEN)
    
    # Only mark as read if the user is not the sender
    if message.sender != request.user:
        message.is_read = True
        message.read_at = timezone.now()
        message.save()
    
    return Response({'message': 'Message marked as read.'})


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_unread_counts(request):
    """Get unread message and notification counts"""
    user = request.user
    
    # Unread messages
    unread_messages = Message.objects.filter(
        conversation__participant=user,
        is_read=False
    ).exclude(sender=user).count()
    
    # Unread notifications
    unread_notifications = Notification.objects.filter(
        user=user,
        is_read=False
    ).count()
    
    return Response({
        'unread_messages': unread_messages,
        'unread_notifications': unread_notifications
    })

from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Conversation, Message, Notification

User = get_user_model()


class UserBriefSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'full_name', 'avatar']
    
    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip()


class MessageSerializer(serializers.ModelSerializer):
    sender = UserBriefSerializer(read_only=True)
    
    class Meta:
        model = Message
        fields = ['id', 'conversation', 'sender', 'content', 'attachment', 
                  'is_read', 'read_at', 'created_at']
        read_only_fields = ['is_read', 'read_at', 'created_at']


class MessageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['conversation', 'content', 'attachment']
    
    def validate_conversation(self, value):
        user = self.context['request'].user
        if not value.participant == user and not user.is_staff:
            raise serializers.ValidationError("You don't have permission to send messages in this conversation.")
        return value


class ConversationSerializer(serializers.ModelSerializer):
    participant = UserBriefSerializer(read_only=True)
    last_message = serializers.SerializerMethodField()
    unread_count = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Conversation
        fields = ['id', 'participant', 'subject', 'is_active', 
                  'created_at', 'updated_at', 'last_message', 'unread_count']
    
    def get_last_message(self, obj):
        last_msg = obj.messages.first()
        if last_msg:
            return MessageSerializer(last_msg).data
        return None


class ConversationCreateSerializer(serializers.ModelSerializer):
    initial_message = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = Conversation
        fields = ['subject', 'initial_message']
    
    def create(self, validated_data):
        initial_message = validated_data.pop('initial_message')
        user = self.context['request'].user
        
        conversation = Conversation.objects.create(
            participant=user,
            **validated_data
        )
        
        Message.objects.create(
            conversation=conversation,
            sender=user,
            content=initial_message
        )
        
        return conversation


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'title', 'message', 'notification_type', 
                  'link', 'is_read', 'created_at']

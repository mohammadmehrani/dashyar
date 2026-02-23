from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

User = get_user_model()


class Conversation(models.Model):
    """Conversation between user and admin"""
    participant = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='conversations',
        verbose_name=_('participant')
    )
    subject = models.CharField(_('subject'), max_length=200)
    is_active = models.BooleanField(_('is active'), default=True)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)
    
    class Meta:
        verbose_name = _('Conversation')
        verbose_name_plural = _('Conversations')
        ordering = ['-updated_at']
    
    def __str__(self):
        return f"{self.participant.email} - {self.subject}"
    
    @property
    def unread_count(self):
        return self.messages.filter(is_read=False).exclude(sender=self.participant).count()
    
    @property
    def last_message(self):
        return self.messages.first()


class Message(models.Model):
    """Individual message in a conversation"""
    conversation = models.ForeignKey(
        Conversation, 
        on_delete=models.CASCADE, 
        related_name='messages',
        verbose_name=_('conversation')
    )
    sender = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='sent_messages',
        verbose_name=_('sender')
    )
    content = models.TextField(_('content'))
    attachment = models.FileField(_('attachment'), upload_to='message_attachments/', blank=True, null=True)
    is_read = models.BooleanField(_('is read'), default=False)
    read_at = models.DateTimeField(_('read at'), blank=True, null=True)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    
    class Meta:
        verbose_name = _('Message')
        verbose_name_plural = _('Messages')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.sender.email}: {self.content[:50]}..."


class Notification(models.Model):
    """User notifications"""
    NOTIFICATION_TYPES = [
        ('message', _('New Message')),
        ('system', _('System')),
        ('update', _('Update')),
    ]
    
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='notifications',
        verbose_name=_('user')
    )
    title = models.CharField(_('title'), max_length=200)
    message = models.TextField(_('message'))
    notification_type = models.CharField(
        _('notification type'), 
        max_length=20, 
        choices=NOTIFICATION_TYPES,
        default='message'
    )
    link = models.CharField(_('link'), max_length=500, blank=True)
    is_read = models.BooleanField(_('is read'), default=False)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    
    class Meta:
        verbose_name = _('Notification')
        verbose_name_plural = _('Notifications')
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.email} - {self.title}"

from django.urls import path
from . import views

urlpatterns = [
    # User endpoints
    path('conversations/', views.UserConversationListView.as_view(), name='user-conversations'),
    path('conversations/create/', views.UserConversationCreateView.as_view(), name='user-conversation-create'),
    path('conversations/<int:pk>/', views.UserConversationDetailView.as_view(), name='user-conversation-detail'),
    path('conversations/<int:conversation_id>/messages/', views.UserMessageListView.as_view(), name='user-messages'),
    path('messages/send/', views.UserMessageCreateView.as_view(), name='user-message-create'),
    
    # Admin endpoints
    path('admin/conversations/', views.AdminConversationListView.as_view(), name='admin-conversations'),
    path('admin/conversations/<int:pk>/', views.AdminConversationDetailView.as_view(), name='admin-conversation-detail'),
    path('admin/messages/send/', views.AdminMessageCreateView.as_view(), name='admin-message-create'),
    
    # Notification endpoints
    path('notifications/', views.NotificationListView.as_view(), name='notifications'),
    path('notifications/<int:pk>/read/', views.NotificationMarkReadView.as_view(), name='notification-read'),
    path('notifications/read-all/', views.mark_all_notifications_read, name='notifications-read-all'),
    
    # Utility endpoints
    path('messages/<int:message_id>/read/', views.mark_message_read, name='message-read'),
    path('unread-counts/', views.get_unread_counts, name='unread-counts'),
]

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messagingAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Plus, Send, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

export default function Messages() {
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();
  const isRTL = i18n.language === 'fa';

  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [newConversationOpen, setNewConversationOpen] = useState(false);
  const [newConversationData, setNewConversationData] = useState({
    subject: '',
    initial_message: '',
  });

  // Fetch conversations
  const { data: conversationsData, isLoading: conversationsLoading } = useQuery({
    queryKey: ['conversations'],
    queryFn: () => messagingAPI.getConversations(),
  });

  // Fetch messages for selected conversation
  const { data: messagesData, isLoading: messagesLoading } = useQuery({
    queryKey: ['messages', selectedConversation],
    queryFn: () =>
      selectedConversation
        ? messagingAPI.getMessages(selectedConversation)
        : Promise.resolve({ data: [] } as any),
    enabled: !!selectedConversation,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: (data: { conversation: number; content: string }) =>
      messagingAPI.sendMessage(data),
    onSuccess: () => {
      setNewMessage('');
      queryClient.invalidateQueries({ queryKey: ['messages', selectedConversation] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });

  // Create conversation mutation
  const createConversationMutation = useMutation({
    mutationFn: (data: { subject: string; initial_message: string }) =>
      messagingAPI.createConversation(data),
    onSuccess: (response: any) => {
      setNewConversationOpen(false);
      setNewConversationData({ subject: '', initial_message: '' });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      setSelectedConversation(response.data.id);
      toast.success(isRTL ? 'گفتگو ایجاد شد' : 'Conversation created');
    },
  });

  const conversations = (conversationsData?.data as any[]) || [];
  const messages = (messagesData?.data as any[]) || [];

  const selectedConversationData = conversations.find(
    (c: any) => c.id === selectedConversation
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    sendMessageMutation.mutate({
      conversation: selectedConversation,
      content: newMessage,
    });
  };

  const handleCreateConversation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConversationData.subject.trim() || !newConversationData.initial_message.trim())
      return;

    createConversationMutation.mutate(newConversationData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('dashboard.messages')}</h1>
        <Dialog open={newConversationOpen} onOpenChange={setNewConversationOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t('dashboard.new_message')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('dashboard.new_message')}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateConversation} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {isRTL ? 'موضوع' : 'Subject'}
                </label>
                <Input
                  value={newConversationData.subject}
                  onChange={(e) =>
                    setNewConversationData((prev) => ({ ...prev, subject: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {isRTL ? 'پیام' : 'Message'}
                </label>
                <textarea
                  value={newConversationData.initial_message}
                  onChange={(e) =>
                    setNewConversationData((prev) => ({
                      ...prev,
                      initial_message: e.target.value,
                    }))
                  }
                  rows={4}
                  className="w-full px-3 py-2 rounded-md border bg-background"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={createConversationMutation.isPending}
                className="w-full"
              >
                {createConversationMutation.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                {t('dashboard.send_message')}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="lg:col-span-1 overflow-hidden">
          <CardHeader>
            <CardTitle>{isRTL ? 'گفتگوها' : 'Conversations'}</CardTitle>
          </CardHeader>
          <ScrollArea className="h-[500px]">
            <CardContent className="space-y-2">
              {conversationsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : conversations.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>{t('dashboard.no_messages')}</p>
                </div>
              ) : (
                conversations.map((conversation: any) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      selectedConversation === conversation.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium truncate">{conversation.subject}</span>
                      {conversation.unread_count > 0 && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-red-500 text-white">
                          {conversation.unread_count}
                        </span>
                      )}
                    </div>
                    {conversation.last_message && (
                      <p className="text-sm opacity-70 truncate mt-1">
                        {conversation.last_message.content}
                      </p>
                    )}
                  </button>
                ))
              )}
            </CardContent>
          </ScrollArea>
        </Card>

        {/* Messages */}
        <Card className="lg:col-span-2 overflow-hidden flex flex-col">
          {selectedConversation ? (
            <>
              <CardHeader className="border-b">
                <CardTitle>{selectedConversationData?.subject}</CardTitle>
              </CardHeader>

              <ScrollArea className="flex-1 p-4">
                {messagesLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    {t('dashboard.no_messages')}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {[...messages].reverse().map((message: any) => {
                      const isMe = message.sender?.id === selectedConversationData?.participant?.id;
                      return (
                        <div
                          key={message.id}
                          className={`flex ${isMe ? 'justify-start' : 'justify-end'}`}
                        >
                          <div
                            className={`max-w-[70%] p-3 rounded-lg ${
                              isMe
                                ? 'bg-muted'
                                : 'bg-primary text-primary-foreground'
                            }`}
                          >
                            <p>{message.content}</p>
                            <span className="text-xs opacity-70 mt-1 block">
                              {new Date(message.created_at).toLocaleString(isRTL ? 'fa-IR' : 'en-US')}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>

              <CardContent className="border-t p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={isRTL ? 'پیام خود را بنویسید...' : 'Type your message...'}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={sendMessageMutation.isPending}>
                    {sendMessageMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
              </CardContent>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>{isRTL ? 'یک گفتگو را انتخاب کنید' : 'Select a conversation'}</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

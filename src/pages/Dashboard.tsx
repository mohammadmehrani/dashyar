import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { messagingAPI, authAPI } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  MessageSquare,
  Bell,
  User,
  ArrowRight,
  Mail,
  Phone,
  Building,
  Calendar,
} from 'lucide-react';

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const isRTL = i18n.language === 'fa';

  // Fetch unread counts
  const { data: unreadData } = useQuery({
    queryKey: ['unread-counts'],
    queryFn: () => messagingAPI.getUnreadCounts(),
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Fetch user stats
  const { data: statsData } = useQuery({
    queryKey: ['user-stats'],
    queryFn: () => authAPI.getStats(),
  });

  useEffect(() => {
    document.title = t('dashboard.title') + ' - App@B2B';
  }, [t]);

  const unreadMessages = unreadData?.data?.unread_messages || 0;
  const unreadNotifications = unreadData?.data?.unread_notifications || 0;

  const quickLinks = [
    {
      icon: MessageSquare,
      title: t('dashboard.messages'),
      href: '/dashboard/messages',
      badge: unreadMessages > 0 ? unreadMessages : null,
    },
    {
      icon: Bell,
      title: t('dashboard.notifications'),
      href: '/dashboard/notifications',
      badge: unreadNotifications > 0 ? unreadNotifications : null,
    },
    {
      icon: User,
      title: t('dashboard.profile'),
      href: '/dashboard/profile',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">
          {t('dashboard.welcome')}, {user?.first_name}!
        </h1>
        <p className="text-muted-foreground">
          {isRTL
            ? 'اینجا می‌توانید پیام‌های خود را مدیریت کنید و پروفایل خود را به‌روز کنید.'
            : 'Here you can manage your messages and update your profile.'}
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('dashboard.messages')}</p>
                <p className="text-2xl font-bold">{statsData?.data?.total_messages || 0}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <MessageSquare className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {isRTL ? 'پیام‌های خوانده نشده' : 'Unread Messages'}
                </p>
                <p className="text-2xl font-bold">{unreadMessages}</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-500/10 text-yellow-500">
                <Mail className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {isRTL ? 'اعلان‌های خوانده نشده' : 'Unread Notifications'}
                </p>
                <p className="text-2xl font-bold">{unreadNotifications}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
                <Bell className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl font-bold mb-4">
          {isRTL ? 'دسترسی سریع' : 'Quick Access'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link key={index} to={link.href}>
                <Card className="hover:border-primary/50 transition-colors group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-medium">{link.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {link.badge && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">
                            {link.badge}
                          </span>
                        )}
                        <ArrowRight
                          className={`h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors ${
                            isRTL ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Profile Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.profile')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('auth.register.first_name')}</p>
                  <p className="font-medium">{user?.first_name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('auth.register.last_name')}</p>
                  <p className="font-medium">{user?.last_name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('auth.register.email')}</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('auth.register.phone')}</p>
                  <p className="font-medium">{user?.phone || '-'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('auth.register.company')}</p>
                  <p className="font-medium">{user?.company_name || '-'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    {isRTL ? 'تاریخ عضویت' : 'Member Since'}
                  </p>
                  <p className="font-medium">
                    {user?.created_at
                      ? new Date(user.created_at).toLocaleDateString(
                          isRTL ? 'fa-IR' : 'en-US'
                        )
                      : '-'}
                  </p>
                </div>
              </div>
            </div>

            <Button asChild variant="outline" className="w-full">
              <Link to="/dashboard/profile">{t('dashboard.edit_profile')}</Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

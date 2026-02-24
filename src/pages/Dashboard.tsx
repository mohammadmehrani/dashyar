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
  CalendarDays,
  ShieldCheck,
} from 'lucide-react';

export default function Dashboard() {
  const { i18n } = useTranslation();
  const { user } = useAuth();
  const isRTL = i18n.language === 'fa';

  const { data: unreadData } = useQuery({
    queryKey: ['unread-counts'],
    queryFn: () => messagingAPI.getUnreadCounts(),
    refetchInterval: 30000,
  });

  const { data: statsData } = useQuery({
    queryKey: ['user-stats'],
    queryFn: () => authAPI.getStats(),
  });

  useEffect(() => {
    document.title = isRTL ? 'داشبورد - Dashyar' : 'Dashboard - Dashyar';
  }, [isRTL]);

  const unreadMessages = unreadData?.data?.unread_messages || 0;
  const unreadNotifications = unreadData?.data?.unread_notifications || 0;
  const totalMessages = statsData?.data?.total_messages || 0;

  const quickLinks = [
    {
      icon: MessageSquare,
      title: isRTL ? 'پیام‌ها' : 'Messages',
      subtitle: isRTL ? 'گفتگوها و پاسخ‌ها' : 'Conversations and replies',
      href: '/dashboard/messages',
      badge: unreadMessages,
    },
    {
      icon: Bell,
      title: isRTL ? 'اعلان‌ها' : 'Notifications',
      subtitle: isRTL ? 'رویدادهای اخیر حساب' : 'Recent account events',
      href: '/dashboard/notifications',
      badge: unreadNotifications,
    },
    {
      icon: User,
      title: isRTL ? 'پروفایل' : 'Profile',
      subtitle: isRTL ? 'ویرایش اطلاعات حساب' : 'Update account details',
      href: '/dashboard/profile',
      badge: 0,
    },
  ];

  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border bg-gradient-to-r from-primary/15 via-background to-background p-6 md:p-8"
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">
              {isRTL ? `سلام ${user?.first_name || ''}` : `Welcome ${user?.first_name || ''}`}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
              {isRTL
                ? 'از این بخش می‌توانید پیام‌ها، اعلان‌ها و اطلاعات حساب خود را مدیریت کنید.'
                : 'Manage your messages, notifications, and account details from this dashboard.'}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-xs">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>{user?.user_type === 'admin' ? (isRTL ? 'مدیر' : 'Admin') : (isRTL ? 'کاربر' : 'User')}</span>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isRTL ? 'کل پیام‌ها' : 'Total Messages'}</p>
                <p className="mt-1 text-2xl font-bold">{totalMessages}</p>
              </div>
              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <MessageSquare className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isRTL ? 'خوانده نشده' : 'Unread Messages'}</p>
                <p className="mt-1 text-2xl font-bold">{unreadMessages}</p>
              </div>
              <div className="rounded-xl bg-yellow-500/10 p-3 text-yellow-500">
                <Mail className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{isRTL ? 'اعلان‌های جدید' : 'Unread Notifications'}</p>
                <p className="mt-1 text-2xl font-bold">{unreadNotifications}</p>
              </div>
              <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500">
                <Bell className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="mb-4 text-xl font-bold">{isRTL ? 'دسترسی سریع' : 'Quick Access'}</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} to={item.href}>
                <Card className="group h-full border hover:border-primary/40">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="rounded-xl bg-muted p-2.5 transition-colors group-hover:bg-primary/10">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{item.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.badge > 0 && (
                          <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                            {item.badge}
                          </span>
                        )}
                        <ArrowRight className={`h-4 w-4 text-muted-foreground ${isRTL ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>{isRTL ? 'اطلاعات حساب' : 'Account Overview'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">{isRTL ? 'نام' : 'First Name'}</p>
                  <p className="font-medium">{user?.first_name || '-'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">{isRTL ? 'نام خانوادگی' : 'Last Name'}</p>
                  <p className="font-medium">{user?.last_name || '-'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">{isRTL ? 'ایمیل' : 'Email'}</p>
                  <p className="font-medium">{user?.email || '-'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">{isRTL ? 'تلفن' : 'Phone'}</p>
                  <p className="font-medium">{user?.phone || '-'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">{isRTL ? 'شرکت' : 'Company'}</p>
                  <p className="font-medium">{user?.company_name || '-'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">{isRTL ? 'تاریخ عضویت' : 'Member Since'}</p>
                  <p className="font-medium">
                    {user?.created_at
                      ? new Date(user.created_at).toLocaleDateString(isRTL ? 'fa-IR' : 'en-US')
                      : '-'}
                  </p>
                </div>
              </div>
            </div>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link to="/dashboard/profile">{isRTL ? 'ویرایش پروفایل' : 'Edit Profile'}</Link>
            </Button>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
}

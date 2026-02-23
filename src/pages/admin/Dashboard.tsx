import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { portfolioAPI, messagingAPI } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Briefcase, MessageSquare, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  // Fetch stats
  const { data: portfolioStats } = useQuery({
    queryKey: ['portfolio-stats'],
    queryFn: () => portfolioAPI.getStats(),
  });

  const { data: conversationsData } = useQuery({
    queryKey: ['admin-conversations'],
    queryFn: () => messagingAPI.getAllConversations(),
  });

  const stats = [
    {
      title: t('admin.total_users'),
      value: '0',
      icon: Users,
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      title: t('admin.total_projects'),
      value: portfolioStats?.data?.total_projects || 0,
      icon: Briefcase,
      color: 'bg-green-500/10 text-green-500',
    },
    {
      title: t('admin.total_messages'),
      value: conversationsData?.data?.length || 0,
      icon: MessageSquare,
      color: 'bg-yellow-500/10 text-yellow-500',
    },
    {
      title: t('admin.pending_messages'),
      value:
        conversationsData?.data?.filter((c: any) => c.unread_count > 0).length || 0,
      icon: TrendingUp,
      color: 'bg-red-500/10 text-red-500',
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">{t('admin.title')}</h1>
        <p className="text-muted-foreground mt-2">
          {isRTL
            ? 'به پنل مدیریت خوش آمدید'
            : 'Welcome to the admin panel'}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>{isRTL ? 'فعالیت‌های اخیر' : 'Recent Activity'}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              {isRTL
                ? 'فعالیت‌های اخیر اینجا نمایش داده می‌شود'
                : 'Recent activities will be shown here'}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

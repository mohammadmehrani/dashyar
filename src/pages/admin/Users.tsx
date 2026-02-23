import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminUsers() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">{t('admin.users')}</h1>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>{isRTL ? 'لیست کاربران' : 'User List'}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            {isRTL
              ? 'مدیریت کاربران در این بخش انجام می‌شود'
              : 'User management will be implemented here'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

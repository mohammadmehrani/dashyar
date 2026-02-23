import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <span className="text-9xl font-bold text-primary/20">404</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {isRTL ? 'صفحه مورد نظر یافت نشد' : 'Page Not Found'}
        </h1>
        
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          {isRTL
            ? 'متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا منتقل شده است.'
            : 'Sorry, the page you are looking for does not exist or has been moved.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              {t('nav.home')}
            </Link>
          </Button>
          
          <Button variant="outline" size="lg" onClick={() => window.history.back()}>
            <ArrowLeft className={`mr-2 h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
            {isRTL ? 'بازگشت' : 'Go Back'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

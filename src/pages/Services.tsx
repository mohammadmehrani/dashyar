import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, Brain, Droplets, HeartPulse, ScanSearch, Sparkles, Stethoscope, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const serviceCards = [
  { icon: Stethoscope, titleKey: 'services.web_development.title', descriptionKey: 'services.web_development.description' },
  { icon: Zap, titleKey: 'services.mobile_app.title', descriptionKey: 'services.mobile_app.description' },
  { icon: HeartPulse, titleKey: 'services.ai.title', descriptionKey: 'services.ai.description' },
  { icon: Activity, titleKey: 'services.design.title', descriptionKey: 'services.design.description' },
  { icon: ScanSearch, titleKey: 'services.cloud.title', descriptionKey: 'services.cloud.description' },
  { icon: Droplets, titleKey: 'services.security.title', descriptionKey: 'services.security.description' },
  { icon: Brain, titleKey: 'services.performance.title', descriptionKey: 'services.performance.description' },
];

export default function Services() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  useEffect(() => {
    document.title = `${t('services.title')} - ${t('app.name')}`;
  }, [t]);

  return (
    <div className="min-h-screen pt-20">
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-700">
              <Sparkles className="h-3.5 w-3.5" />
              {isRTL ? 'خدمات درمانی مطب' : 'Clinic treatments'}
            </div>
            <h1 className="mt-5 text-4xl font-black md:text-6xl">{t('services.title')}</h1>
            <p className="mt-5 text-muted-foreground md:text-lg">{t('services.subtitle')}</p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {serviceCards.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.titleKey}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative overflow-hidden rounded-[1.75rem] border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-400/15 blur-2xl" />
                  <div className="relative">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-bold">{t(service.titleKey)}</h2>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{t(service.descriptionKey)}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="rounded-[2rem] bg-gradient-to-r from-emerald-600 to-cyan-600 p-8 text-center md:p-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-black text-primary-foreground md:text-4xl">{t('services.cta.title')}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/85">{t('services.cta.subtitle')}</p>
            <Button asChild size="lg" variant="secondary" className="mt-8 bg-background text-foreground hover:bg-background/90">
              <Link to="/contact">
                {t('contact.title')}
                <ArrowRight className={`ml-2 h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

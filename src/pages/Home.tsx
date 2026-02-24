import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Code, Palette, Smartphone } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { coreAPI } from '@/lib/api';

const services = [
  {
    icon: Code,
    title: 'services.web_development.title',
    description: 'services.web_development.description',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Smartphone,
    title: 'services.mobile_app.title',
    description: 'services.mobile_app.description',
    color: 'from-fuchsia-500 to-pink-500',
  },
  {
    icon: Brain,
    title: 'services.ai.title',
    description: 'services.ai.description',
    color: 'from-orange-500 to-rose-500',
  },
  {
    icon: Palette,
    title: 'services.design.title',
    description: 'services.design.description',
    color: 'from-emerald-500 to-green-500',
  },
];

export default function Home() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  useQuery({
    queryKey: ['site-content', i18n.language],
    queryFn: () => coreAPI.getSiteContent(i18n.language),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    document.title = `Dashyar - ${t('app.tagline')}`;
  }, [t]);

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="relative container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs md:text-sm text-primary"
            >
              {t('app.description')}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-4xl font-bold leading-tight md:text-6xl"
            >
              {t('hero.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-xl"
            >
              {t('hero.subtitle')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Button size="lg" asChild>
                <Link to="/services">
                  {t('hero.cta_primary')}
                  <ArrowRight className={`ml-2 h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">{t('hero.cta_secondary')}</Link>
              </Button>
            </motion.div>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            {[
              { value: '70+', label: t('about.stats.projects') },
              { value: '40+', label: t('about.stats.clients') },
              { value: '12+', label: t('about.stats.awards') },
              { value: '9+', label: t('about.stats.experience') },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border bg-card/50 p-4 text-center">
                <div className="text-2xl font-bold text-primary md:text-3xl">{item.value}</div>
                <div className="mt-1 text-xs text-muted-foreground md:text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-5xl">{t('services.title')}</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">{t('services.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group relative overflow-hidden rounded-2xl border bg-card p-6"
                >
                  <div className={`absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br ${service.color} opacity-20 blur-2xl`} />
                  <div className="relative">
                    <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white ${service.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{t(service.title)}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">{t(service.description)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link to="/services">
                {t('common.view_all')}
                <ArrowRight className={`ml-2 h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-gradient-to-r from-primary to-primary/80 px-6 py-12 text-center md:px-10">
            <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">{t('home.cta.title')}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/85">{t('home.cta.subtitle')}</p>
            <Button size="lg" variant="secondary" asChild className="mt-8 bg-background text-foreground hover:bg-background/90">
              <Link to="/contact">
                {t('contact.title')}
                <ArrowRight className={`ml-2 h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Cloud, Code, Palette, Shield, Smartphone, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const serviceCards = [
  { icon: Code, title: 'services.web_development.title', description: 'services.web_development.description', color: 'from-blue-500 to-cyan-500' },
  { icon: Smartphone, title: 'services.mobile_app.title', description: 'services.mobile_app.description', color: 'from-fuchsia-500 to-pink-500' },
  { icon: Brain, title: 'services.ai.title', description: 'services.ai.description', color: 'from-orange-500 to-rose-500' },
  { icon: Palette, title: 'services.design.title', description: 'services.design.description', color: 'from-emerald-500 to-green-500' },
  { icon: Cloud, title: 'services.cloud.title', description: 'services.cloud.description', color: 'from-sky-500 to-blue-500' },
  { icon: Shield, title: 'services.security.title', description: 'services.security.description', color: 'from-red-500 to-rose-500' },
  { icon: Zap, title: 'services.performance.title', description: 'services.performance.description', color: 'from-amber-500 to-yellow-500' },
];

export default function Services() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('services.title')} - Dashyar`;
  }, [t]);

  return (
    <div className="min-h-screen pt-20">
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold">{t('services.title')}</h1>
            <p className="mt-5 text-muted-foreground md:text-lg">{t('services.subtitle')}</p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {serviceCards.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative overflow-hidden rounded-2xl border bg-card p-6"
                >
                  <div className={`absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${service.color} opacity-20 blur-2xl`} />
                  <div className="relative">
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} text-white`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-semibold">{t(service.title)}</h2>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{t(service.description)}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-gradient-to-r from-primary to-primary/80 p-8 text-center md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">{t('services.cta.title')}</h2>
            <p className="mt-4 mx-auto max-w-2xl text-primary-foreground/85">{t('services.cta.subtitle')}</p>
            <Button asChild size="lg" variant="secondary" className="mt-8 bg-background text-foreground hover:bg-background/90">
              <Link to="/contact">{t('contact.title')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

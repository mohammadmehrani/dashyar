import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Code2, Palette, Smartphone, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { coreAPI } from '@/lib/api';

const serviceItems = [
  { icon: Code2, title: 'services.web_development.title', description: 'services.web_development.description' },
  { icon: Smartphone, title: 'services.mobile_app.title', description: 'services.mobile_app.description' },
  { icon: Brain, title: 'services.ai.title', description: 'services.ai.description' },
  { icon: Palette, title: 'services.design.title', description: 'services.design.description' },
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
    <div className="min-h-screen overflow-hidden">
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-120px] top-[-100px] h-[340px] w-[340px] rounded-full bg-cyan-400/30 blur-3xl" />
          <div className="absolute right-[-120px] top-[40px] h-[320px] w-[320px] rounded-full bg-blue-500/25 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
        </div>

        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                {t('app.description')}
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
                {t('hero.title')}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                {t('hero.subtitle')}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild className="shadow">
                  <Link to="/contact">
                    {t('hero.cta_secondary')}
                    <ArrowRight className={`ml-2 h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/services">{t('hero.cta_primary')}</Link>
                </Button>
              </div>
              <div className="mt-8 grid max-w-md grid-cols-3 gap-3">
                {[
                  { v: '70+', l: isRTL ? 'پروژه' : 'Projects' },
                  { v: '40+', l: isRTL ? 'مشتری' : 'Clients' },
                  { v: '9+', l: isRTL ? 'سال' : 'Years' },
                ].map((item) => (
                  <div key={item.l} className="rounded-xl border bg-card/90 p-3 text-center shadow-sm">
                    <div className="text-xl font-bold text-primary">{item.v}</div>
                    <div className="text-xs text-muted-foreground">{item.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="relative"
            >
              <div className="rounded-3xl border bg-card p-6 shadow-xl md:p-7">
                <h2 className="text-xl font-extrabold">{isRTL ? 'تیم محصول محور' : 'Outcome-Focused Team'}</h2>
                <p className="mt-3 text-sm leading-8 text-muted-foreground">
                  {isRTL
                    ? 'از تحلیل نیاز تا انتشار نسخه نهایی، مسیر اجرای پروژه شفاف، مرحله‌ای و قابل سنجش است.'
                    : 'From discovery to release, your project moves through a clear and measurable delivery pipeline.'}
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    isRTL ? 'تحلیل و طراحی قبل از توسعه' : 'Discovery and design before coding',
                    isRTL ? 'تحویل اسپرینتی با گزارش دقیق' : 'Sprint-based delivery with clear reports',
                    isRTL ? 'پشتیبانی و بهینه‌سازی پس از لانچ' : 'Post-launch support and optimization',
                  ].map((line) => (
                    <div key={line} className="rounded-xl bg-muted/60 px-3 py-2 text-sm">
                      {line}
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <h2 className="text-3xl font-extrabold md:text-5xl">{t('services.title')}</h2>
            <p className="mt-4 text-muted-foreground">{t('services.subtitle')}</p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2">
            {serviceItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.4 }}
                  className="group rounded-2xl border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">{t(item.title)}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{t(item.description)}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-r from-primary to-blue-500 px-8 py-12 text-center text-primary-foreground md:px-12"
          >
            <h2 className="text-3xl font-extrabold md:text-4xl">{t('home.cta.title')}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/90">{t('home.cta.subtitle')}</p>
            <Button size="lg" variant="secondary" asChild className="mt-8 bg-white text-slate-900 hover:bg-white/90">
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

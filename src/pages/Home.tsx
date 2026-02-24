import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, CheckCircle2, Code2, Palette, Smartphone } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { coreAPI } from '@/lib/api';

const services = [
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
    <div className="min-h-screen">
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(56,189,248,0.18),transparent_32%),radial-gradient(circle_at_90%_0%,rgba(59,130,246,0.20),transparent_30%)]" />
        <div className="container relative mx-auto px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary">
                {t('app.description')}
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
                {t('hero.title')}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
                {t('hero.subtitle')}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild className="shadow-sm">
                  <Link to="/contact">
                    {t('hero.cta_secondary')}
                    <ArrowRight className={`ml-2 h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/services">{t('hero.cta_primary')}</Link>
                </Button>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                {[
                  { value: '70+', label: isRTL ? 'پروژه' : 'Projects' },
                  { value: '40+', label: isRTL ? 'مشتری' : 'Clients' },
                  { value: '9+', label: isRTL ? 'سال تجربه' : 'Years' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border bg-card p-3">
                    <div className="text-xl font-bold text-primary">{item.value}</div>
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <div className="rounded-3xl border bg-card p-6 shadow-lg">
                <h3 className="text-lg font-bold">{isRTL ? 'چرا دشیار؟' : 'Why Dashyar?'}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {isRTL
                    ? 'ما فقط کد نمی‌زنیم. ما به نتیجه کسب‌وکار فکر می‌کنیم و هر پروژه را با برنامه، طراحی و اجرای دقیق تحویل می‌دهیم.'
                    : 'We do not just code. We focus on business outcomes and deliver with clear strategy, design, and execution.'}
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    isRTL ? 'تحلیل دقیق قبل از توسعه' : 'Discovery before development',
                    isRTL ? 'تحویل مرحله‌ای و قابل سنجش' : 'Milestone-based delivery',
                    isRTL ? 'پشتیبانی بعد از انتشار' : 'Post-launch support',
                  ].map((text) => (
                    <div key={text} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-2xl bg-primary/15 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold md:text-5xl">{t('services.title')}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{t('services.subtitle')}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.45 }}
                  className="rounded-2xl border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">{t(service.title)}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{t(service.description)}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border bg-card p-7 md:p-10">
            <h2 className="text-2xl font-bold md:text-3xl">
              {isRTL ? 'فرآیند همکاری با دشیار' : 'How We Work'}
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: isRTL ? '۱. کشف و تحلیل' : '1. Discovery',
                  text: isRTL ? 'نیاز، رقبا و اهداف کسب‌وکار را شفاف می‌کنیم.' : 'We clarify requirements, market, and business goals.',
                },
                {
                  title: isRTL ? '۲. طراحی و توسعه' : '2. Design & Build',
                  text: isRTL ? 'طرح UI/UX و توسعه فنی را مرحله‌ای پیش می‌بریم.' : 'We deliver design and engineering in clear milestones.',
                },
                {
                  title: isRTL ? '۳. استقرار و رشد' : '3. Launch & Grow',
                  text: isRTL ? 'پس از انتشار، پایش و بهینه‌سازی ادامه دارد.' : 'After launch, we monitor and optimize continuously.',
                },
              ].map((step) => (
                <div key={step.title} className="rounded-2xl bg-muted/60 p-5">
                  <h3 className="font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-gradient-to-r from-primary to-blue-500 px-7 py-12 text-center text-primary-foreground md:px-10">
            <h2 className="text-3xl font-extrabold md:text-4xl">{t('home.cta.title')}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/90">{t('home.cta.subtitle')}</p>
            <Button size="lg" variant="secondary" asChild className="mt-8 bg-white text-slate-900 hover:bg-white/90">
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

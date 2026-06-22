import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  HeartPulse,
  MapPin,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Activity,
  MessageSquareQuote,
  Clock3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const highlights = [
  {
    icon: HeartPulse,
    titleFa: 'کاهش درد',
    titleEn: 'Pain relief',
    textFa: 'برنامه درمانی دقیق برای دردهای حاد و مزمن.',
    textEn: 'A focused plan for acute and chronic pain.',
  },
  {
    icon: Activity,
    titleFa: 'بازتوانی حرکتی',
    titleEn: 'Functional rehab',
    textFa: 'بازگشت تدریجی به فعالیت روزمره و ورزشی.',
    textEn: 'Step-by-step return to daily and athletic activity.',
  },
  {
    icon: ShieldCheck,
    titleFa: 'پیگیری قابل اعتماد',
    titleEn: 'Reliable follow-up',
    textFa: 'پیگیری منظم برای اینکه مسیر درمان شفاف بماند.',
    textEn: 'Structured follow-up that keeps the path clear.',
  },
];

const services = [
  {
    titleFa: 'فیزیوتراپی و درمان دستی',
    titleEn: 'Physiotherapy & manual therapy',
    textFa: 'برای درد گردن، کمر، زانو و آسیب‌های اسکلتی-عضلانی.',
    textEn: 'For neck, back, knee, and musculoskeletal pain.',
  },
  {
    titleFa: 'شاک ویو و لیزر پرتوان',
    titleEn: 'Shockwave & high-power laser',
    textFa: 'گزینه‌های کمکی برای کاهش درد و بهبود التهاب.',
    textEn: 'Adjunct care that helps reduce pain and inflammation.',
  },
  {
    titleFa: 'طب فیزیکی و توانبخشی',
    titleEn: 'Physical medicine & rehab',
    textFa: 'طراحی مسیر درمان بر اساس معاینه و هدف عملکردی.',
    textEn: 'A treatment path built around exam findings and goals.',
  },
  {
    titleFa: 'ورزش درمانی و اصلاحی',
    titleEn: 'Exercise therapy',
    textFa: 'تمرین‌های هدفمند برای افزایش ثبات و پیشگیری از عود.',
    textEn: 'Targeted exercises to build stability and prevent relapse.',
  },
];

const stats = [
  { value: '5000+', labelFa: 'جلسه درمانی', labelEn: 'Sessions' },
  { value: '12+', labelFa: 'خدمت تخصصی', labelEn: 'Specialized services' },
  { value: '24/7', labelFa: 'پاسخ‌گویی', labelEn: 'Availability' },
];

export default function Home() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  useEffect(() => {
    document.title = `${t('app.name')} - ${t('app.tagline')}`;
  }, [t]);

  return (
    <div className="min-h-screen overflow-hidden">
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-140px] top-[-120px] h-[360px] w-[360px] rounded-full bg-emerald-300/40 blur-3xl" />
          <div className="absolute right-[-120px] top-[60px] h-[320px] w-[320px] rounded-full bg-cyan-300/30 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-background" />
        </div>

        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-7"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-700">
                <Sparkles className="h-3.5 w-3.5" />
                {t('app.tagline')}
              </div>

              <div className="space-y-5">
                <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
                  {t('hero.title')}
                </h1>
                <p className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                  {t('hero.subtitle')}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild className="shadow-lg shadow-emerald-500/15">
                  <Link to="/contact">
                    {t('hero.cta_secondary')}
                    <ArrowRight className={`ml-2 h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-emerald-200 bg-white/80 backdrop-blur">
                  <Link to="/services">{t('hero.cta_primary')}</Link>
                </Button>
              </div>

              <div className="grid max-w-xl grid-cols-3 gap-3">
                {stats.map((item) => (
                  <div key={item.value} className="rounded-2xl border bg-card/90 p-4 text-center shadow-sm">
                    <div className="text-2xl font-black text-emerald-700">{item.value}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{isRTL ? item.labelFa : item.labelEn}</div>
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
              <div className="rounded-[2rem] border bg-card p-6 shadow-2xl shadow-emerald-900/5 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-emerald-700">
                      {isRTL ? 'دکتر کیمیا حبیبی سیاهپوش' : 'Dr. Kimia Habibi Siyahpoosh'}
                    </p>
                    <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">
                      {isRTL ? 'مطب فیزیوتراپی و طب فیزیکی' : 'Physiotherapy & physical medicine clinic'}
                    </h2>
                  </div>
                  <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-700">
                    <Stethoscope className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {highlights.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.titleFa} className="flex items-start gap-3 rounded-2xl bg-muted/50 p-4">
                        <div className="rounded-xl bg-white p-2.5 text-emerald-700 shadow-sm">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-semibold">{isRTL ? item.titleFa : item.titleEn}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{isRTL ? item.textFa : item.textEn}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-5 py-4 text-white">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="h-5 w-5" />
                    <div>
                      <p className="text-sm font-semibold">
                        {isRTL ? 'رزرو نوبت آنلاین' : 'Online booking'}
                      </p>
                      <p className="text-sm text-white/85">
                        {isRTL
                          ? 'برای ویزیت، نوبت‌گیری و هماهنگی درمان، از صفحه تماس استفاده کنید.'
                          : 'Use the contact page to request a visit or coordinate care.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-8 -left-6 h-28 w-28 rounded-full bg-emerald-300/40 blur-3xl" />
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
            <h2 className="text-3xl font-black md:text-5xl">{t('services.title')}</h2>
            <p className="mt-4 text-muted-foreground">{t('services.subtitle')}</p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2">
            {services.map((item, index) => (
              <motion.article
                key={item.titleFa}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                className="group rounded-3xl border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">{isRTL ? item.titleFa : item.titleEn}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{isRTL ? item.textFa : item.textEn}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border bg-gradient-to-br from-emerald-50 to-cyan-50 p-6 md:p-8"
            >
              <p className="text-sm font-semibold text-emerald-700">
                {isRTL ? 'چرا این مطب؟' : 'Why this clinic?'}
              </p>
              <h2 className="mt-2 text-2xl font-black md:text-3xl">
                {isRTL ? 'مسیر درمان ساده، شفاف و قابل پیگیری' : 'Simple, clear, and trackable treatment paths'}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {isRTL
                  ? 'هر بیمار بر اساس معاینه، هدف درمان و محدودیت‌های روزمره خودش برنامه می‌گیرد. تمرکز ما روی کاهش درد، افزایش عملکرد و جلوگیری از بازگشت علائم است.'
                  : 'Each patient gets a plan based on the exam, treatment goals, and daily limitations. We focus on pain relief, function, and relapse prevention.'}
              </p>
              <div className="mt-6 space-y-3">
                {[
                  isRTL ? 'تشخیص دقیق و توضیح قابل فهم' : 'Clear diagnosis and plain-language explanation',
                  isRTL ? 'انتخاب درمان بر اساس نیاز واقعی' : 'Treatment matched to real needs',
                  isRTL ? 'پیگیری برای بهبود پایدار' : 'Follow-up for durable recovery',
                ].map((line) => (
                  <div key={line} className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 text-sm shadow-sm">
                    <div className="h-2 w-2 rounded-full bg-emerald-600" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid gap-4 md:grid-cols-3"
            >
              {[
                {
                  icon: Clock3,
                  titleFa: 'پاسخ سریع',
                  titleEn: 'Fast response',
                  textFa: 'هماهنگی سریع برای رزرو و ویزیت.',
                  textEn: 'Quick coordination for visits and booking.',
                },
                {
                  icon: MapPin,
                  titleFa: 'دسترسی محلی',
                  titleEn: 'Local access',
                  textFa: 'رباط‌کریم و مناطق اطراف تهران.',
                  textEn: 'Robat Karim and nearby Tehran areas.',
                },
                {
                  icon: MessageSquareQuote,
                  titleFa: 'ارتباط ساده',
                  titleEn: 'Simple contact',
                  textFa: 'تماس مستقیم از طریق فرم و تلفن.',
                  textEn: 'Direct contact through form and phone.',
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.titleFa} className="rounded-3xl border bg-card p-5 shadow-sm md:col-span-1">
                    <div className="inline-flex rounded-2xl bg-emerald-500/10 p-3 text-emerald-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold">{isRTL ? item.titleFa : item.titleEn}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{isRTL ? item.textFa : item.textEn}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] bg-gradient-to-r from-emerald-600 to-cyan-600 px-8 py-12 text-center text-white md:px-12"
          >
            <h2 className="text-3xl font-black md:text-4xl">{t('home.cta.title')}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/90">{t('home.cta.subtitle')}</p>
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

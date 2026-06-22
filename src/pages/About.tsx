import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Award, CalendarDays, CheckCircle2, HeartPulse, Stethoscope, Users } from 'lucide-react';

const principles = [
  {
    titleFa: 'معاینه دقیق',
    titleEn: 'Careful examination',
    textFa: 'تشخیص بر پایه معاینه و شنیدن دقیق شرح‌حال بیمار انجام می‌شود.',
    textEn: 'Diagnosis starts with a careful exam and a good patient history.',
  },
  {
    titleFa: 'برنامه درمانی روشن',
    titleEn: 'Clear treatment plan',
    textFa: 'هر بیمار مسیر درمانی مشخص و قابل پیگیری دریافت می‌کند.',
    textEn: 'Each patient gets a plan that is clear and trackable.',
  },
  {
    titleFa: 'پیگیری واقعی',
    titleEn: 'Real follow-up',
    textFa: 'هدف، بهبود ماندگار است نه فقط تسکین کوتاه‌مدت.',
    textEn: 'The goal is durable recovery, not just short-term relief.',
  },
];

const stats = [
  { icon: HeartPulse, value: '5000+', titleFa: 'جلسه درمانی', titleEn: 'Therapy sessions' },
  { icon: Users, value: '1000+', titleFa: 'بیمار همراه', titleEn: 'Ongoing patients' },
  { icon: Award, value: '12+', titleFa: 'خدمت تخصصی', titleEn: 'Specialized services' },
  { icon: CalendarDays, value: '10+', titleFa: 'سال تجربه', titleEn: 'Years of experience' },
];

export default function About() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  useEffect(() => {
    document.title = `${t('about.title')} - ${t('app.name')}`;
  }, [t]);

  return (
    <div className="min-h-screen pt-24">
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm font-semibold text-emerald-700">{isRTL ? 'آشنایی با پزشک' : 'Meet the doctor'}</p>
            <h1 className="mt-3 text-4xl font-black md:text-6xl">{t('about.title')}</h1>
            <p className="mt-5 text-muted-foreground md:text-lg">{t('about.description')}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.value} className="rounded-3xl border bg-card p-5 text-center shadow-sm">
                  <div className="mx-auto mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-black text-emerald-700">{item.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{isRTL ? item.titleFa : item.titleEn}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 24 : -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border bg-card p-6 md:p-8"
            >
              <div className="inline-flex rounded-2xl bg-emerald-500/10 p-3 text-emerald-700">
                <Stethoscope className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-2xl font-black">{isRTL ? 'رویکرد درمان' : 'Treatment approach'}</h2>
              <p className="mt-4 text-sm leading-8 text-muted-foreground md:text-base">
                {isRTL
                  ? 'در این مطب، هدف فقط کم کردن درد نیست. ما تلاش می‌کنیم علت را بهتر بفهمیم، درمان را به زبان ساده توضیح دهیم و برنامه‌ای بدهیم که با زندگی واقعی بیمار سازگار باشد.'
                  : 'The clinic does more than reduce pain. We aim to understand the cause, explain treatment in plain language, and build a plan that fits real life.'}
              </p>
              <div className="mt-6 space-y-3">
                {principles.map((item) => (
                  <div key={item.titleFa} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                    <span>{isRTL ? item.titleFa : item.titleEn}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border bg-gradient-to-br from-emerald-50 to-cyan-50 p-6 md:p-8"
            >
              <h2 className="text-2xl font-black">{isRTL ? 'چه چیزی این مطب را متفاوت می‌کند؟' : 'What makes the clinic different?'}</h2>
              <div className="mt-4 grid gap-3">
                {principles.map((item) => (
                  <div key={item.titleEn} className="rounded-2xl bg-white/80 p-4 shadow-sm">
                    <p className="font-semibold">{isRTL ? item.titleFa : item.titleEn}</p>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">{isRTL ? item.textFa : item.textEn}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-[2rem] bg-gradient-to-r from-emerald-600 to-cyan-600 px-8 py-12 text-white md:px-12">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold text-white/85">{isRTL ? 'بیوگرافی کوتاه' : 'Short biography'}</p>
                <h2 className="mt-3 text-3xl font-black md:text-4xl">
                  {isRTL ? 'دکتر کیمیا حبیبی سیاهپوش' : 'Dr. Kimia Habibi Siyahpoosh'}
                </h2>
              </div>
              <div className="space-y-4 text-white/90">
                <p className="leading-8">
                  {isRTL
                    ? 'تمرکز اصلی بر درمان دردهای اسکلتی-عضلانی، توانبخشی بعد از آسیب، و کمک به بیمار برای برگشتن امن و تدریجی به فعالیت روزمره است.'
                    : 'The main focus is musculoskeletal pain, rehabilitation after injury, and helping patients return to daily activity safely and gradually.'}
                </p>
                <p className="leading-8">
                  {isRTL
                    ? 'ترکیب معاینه دقیق، آموزش درست به بیمار و انتخاب درمان مناسب باعث می‌شود روند درمان قابل فهم و پایدار بماند.'
                    : 'Combining careful examination, patient education, and the right treatment makes the process understandable and sustainable.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

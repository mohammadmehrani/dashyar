import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { coreAPI } from '@/lib/api';
import { Award, Briefcase, Calendar, CheckCircle2, Users } from 'lucide-react';

const stats = [
  { icon: Briefcase, value: '70+', key: 'about.stats.projects' },
  { icon: Users, value: '40+', key: 'about.stats.clients' },
  { icon: Award, value: '12+', key: 'about.stats.awards' },
  { icon: Calendar, value: '9+', key: 'about.stats.experience' },
];

export default function About() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  const { data: teamData } = useQuery({
    queryKey: ['team'],
    queryFn: () => coreAPI.getTeam(),
    staleTime: 5 * 60 * 1000,
  });

  const teamMembers = Array.isArray(teamData?.data) ? teamData.data : [];

  useEffect(() => {
    document.title = `${t('about.title')} - Dashyar`;
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
            <h1 className="text-4xl font-extrabold md:text-6xl">{t('about.title')}</h1>
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
                <div key={item.key} className="rounded-2xl border bg-card p-5 text-center shadow-sm">
                  <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-bold text-primary">{item.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{t(item.key)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border bg-card p-6 md:p-8">
              <h2 className="text-2xl font-bold">{isRTL ? 'ماموریت ما' : 'Our Mission'}</h2>
              <p className="mt-4 text-sm leading-8 text-muted-foreground md:text-base">
                {isRTL
                  ? 'دشیار روی توسعه محصولاتی تمرکز دارد که سریع منتشر شوند، نگهداری ساده‌ای داشته باشند و نتیجه واقعی برای کسب‌وکار ایجاد کنند.'
                  : 'Dashyar builds products that ship fast, stay maintainable, and create measurable business value.'}
              </p>
              <div className="mt-6 space-y-3">
                {[
                  isRTL ? 'تحویل مرحله‌ای و شفاف' : 'Transparent milestone delivery',
                  isRTL ? 'توسعه با معماری مقیاس‌پذیر' : 'Scalable architecture',
                  isRTL ? 'پشتیبانی پس از انتشار' : 'Post-launch support',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border bg-gradient-to-br from-primary/10 to-blue-100/60 p-6 md:p-8">
              <h2 className="text-2xl font-bold">{isRTL ? 'چشم‌انداز' : 'Vision'}</h2>
              <p className="mt-4 text-sm leading-8 text-muted-foreground md:text-base">
                {isRTL
                  ? 'تبدیل شدن به شریک فناوری قابل‌اعتماد برای تیم‌هایی که می‌خواهند محصول دیجیتال حرفه‌ای بسازند.'
                  : 'Become the trusted technology partner for teams building serious digital products.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold">{t('team.title')}</h2>
            <p className="mt-3 text-muted-foreground">{t('team.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member: any) => {
              const skills = Array.isArray(member?.skills) ? member.skills : [];
              return (
                <article key={member?.id ?? `${member?.name_en}-${member?.email}`} className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                  <div className="aspect-[4/3] bg-muted">
                    <img
                      src={member?.photo || '/placeholder-avatar.jpg'}
                      alt={isRTL ? member?.name_fa || 'team-member' : member?.name_en || 'team-member'}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold">{isRTL ? member?.name_fa : member?.name_en}</h3>
                    <p className="mt-1 text-sm text-primary">{isRTL ? member?.position_fa : member?.position_en}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {skills.slice(0, 4).map((skill: string) => (
                        <span key={skill} className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { coreAPI } from '@/lib/api';
import { Award, Users, Briefcase, Calendar } from 'lucide-react';

const stats = [
  { icon: Briefcase, value: '50+', label: 'about.stats.projects' },
  { icon: Users, value: '30+', label: 'about.stats.clients' },
  { icon: Award, value: '5+', label: 'about.stats.awards' },
  { icon: Calendar, value: '8+', label: 'about.stats.experience' },
];

const values = [
  {
    title: 'Innovation',
    description: 'We constantly explore new technologies and approaches to deliver cutting-edge solutions.',
  },
  {
    title: 'Quality',
    description: 'We are committed to delivering high-quality products that exceed expectations.',
  },
  {
    title: 'Collaboration',
    description: 'We work closely with our clients to understand their needs and deliver tailored solutions.',
  },
  {
    title: 'Integrity',
    description: 'We maintain the highest standards of professionalism and ethical conduct.',
  },
];

export default function About() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  // Fetch team members
  const { data: teamData } = useQuery({
    queryKey: ['team'],
    queryFn: () => coreAPI.getTeam(),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    document.title = t('about.title') + ' - App@B2B';
  }, [t]);

  const teamMembers = teamData?.data || [];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('about.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{t(stat.label)}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isRTL ? 'ارزش‌های ما' : 'Our Values'}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {isRTL
                ? 'اصولی که ما را هدایت می‌کنند'
                : 'The principles that guide us'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl bg-card border text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-3">
                  {isRTL
                    ? value.title === 'Innovation'
                      ? 'نوآوری'
                      : value.title === 'Quality'
                      ? 'کیفیت'
                      : value.title === 'Collaboration'
                      ? 'همکاری'
                      : 'صداقت'
                    : value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {isRTL
                    ? value.title === 'Innovation'
                      ? 'ما به طور مداوم فناوری‌ها و رویکردهای جدید را برای ارائه راهکارهای پیشرفته بررسی می‌کنیم.'
                      : value.title === 'Quality'
                      ? 'ما متعهد به ارائه محصولات با کیفیت بالا هستیم که انتظارات را برآورده می‌کنند.'
                      : value.title === 'Collaboration'
                      ? 'ما به طور نزدیک با مشتریان خود کار می‌کنیم تا نیازهای آنها را درک کرده و راهکارهای متناسب ارائه دهیم.'
                      : 'ما بالاترین استانداردهای حرفه‌ای و رفتار اخلاقی را حفظ می‌کنیم.'
                    : value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('team.title')}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('team.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member: any, index: number) => (
              <motion.div
                key={member.id}
                className="group relative rounded-2xl overflow-hidden bg-card border hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Photo */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={member.photo || '/placeholder-avatar.jpg'}
                    alt={isRTL ? member.name_fa : member.name_en}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">
                    {isRTL ? member.name_fa : member.name_en}
                  </h3>
                  <p className="text-primary text-sm mb-4">
                    {isRTL ? member.position_fa : member.position_en}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span>
                      {member.experience_years} {t('team.experience')}
                    </span>
                    <span>•</span>
                    <span>
                      {member.projects_count} {t('team.projects')}
                    </span>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1">
                    {member.skills?.slice(0, 4).map((skill: string, skillIndex: number) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-0.5 text-xs rounded bg-muted text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Code,
  Smartphone,
  Brain,
  Palette,
  Database,
  Cloud,
  Shield,
  Zap,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Code,
    title: 'services.web_development.title',
    description: 'services.web_development.description',
    features: [
      'React / Next.js / Vue',
      'Node.js / Python / PHP',
      'RESTful & GraphQL APIs',
      'Database Design',
      'Cloud Deployment',
      'Performance Optimization',
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Smartphone,
    title: 'services.mobile_app.title',
    description: 'services.mobile_app.description',
    features: [
      'iOS & Android Apps',
      'React Native / Flutter',
      'Native Development',
      'Push Notifications',
      'Offline Support',
      'App Store Publishing',
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Brain,
    title: 'services.ai.title',
    description: 'services.ai.description',
    features: [
      'Machine Learning Models',
      'Natural Language Processing',
      'Computer Vision',
      'Data Analysis',
      'Predictive Analytics',
      'AI Integration',
    ],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'Scikit-learn'],
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Palette,
    title: 'services.design.title',
    description: 'services.design.description',
    features: [
      'UI/UX Design',
      'Brand Identity',
      'Logo Design',
      'Web Design',
      'Mobile App Design',
      'Design Systems',
    ],
    technologies: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Sketch'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Database,
    title: 'Database Solutions',
    description: 'Design and implementation of scalable database solutions for your business needs.',
    features: [
      'Database Architecture',
      'Data Migration',
      'Performance Tuning',
      'Backup & Recovery',
      'NoSQL Solutions',
      'Data Warehousing',
    ],
    technologies: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch'],
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Cloud,
    title: 'Cloud Services',
    description: 'Cloud infrastructure setup, migration, and management for optimal performance.',
    features: [
      'Cloud Migration',
      'Infrastructure Setup',
      'DevOps Automation',
      'Monitoring & Logging',
      'Cost Optimization',
      '24/7 Support',
    ],
    technologies: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes'],
    color: 'from-sky-500 to-blue-500',
  },
  {
    icon: Shield,
    title: 'Cyber Security',
    description: 'Comprehensive security solutions to protect your digital assets.',
    features: [
      'Security Audits',
      'Penetration Testing',
      'Vulnerability Assessment',
      'Security Training',
      'Compliance Consulting',
      'Incident Response',
    ],
    technologies: ['OWASP', 'SSL/TLS', 'WAF', 'SIEM', 'DLP'],
    color: 'from-red-500 to-rose-500',
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Optimize your applications for maximum speed and efficiency.',
    features: [
      'Load Testing',
      'Code Optimization',
      'Caching Strategies',
      'CDN Integration',
      'Database Optimization',
      'Frontend Optimization',
    ],
    technologies: ['Redis', 'Varnish', 'Nginx', 'Webpack', 'Lighthouse'],
    color: 'from-yellow-500 to-amber-500',
  },
];

export default function Services() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  useEffect(() => {
    document.title = t('services.title') + ' - App@B2B';
  }, [t]);

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
              {t('services.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('services.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  className="group relative p-8 rounded-2xl bg-card border hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />

                  <div className="relative">
                    <div className="flex items-start gap-6">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} text-white flex-shrink-0`}
                      >
                        <Icon className="h-8 w-8" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-3">
                          {service.title.startsWith('services.')
                            ? t(service.title)
                            : service.title}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          {service.description.startsWith('services.')
                            ? t(service.description)
                            : service.description}
                        </p>

                        {/* Features */}
                        <ul className="space-y-2 mb-6">
                          {service.features.map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="flex items-center gap-2 text-sm"
                            >
                              <Check className="h-4 w-4 text-primary flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />

            <div className="relative px-8 py-16 md:py-24 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                {isRTL
                  ? 'نیاز به راهکار سفارشی دارید؟'
                  : 'Need a custom solution?'}
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
                {isRTL
                  ? 'تیم ما آماده است تا راهکارهای سفارشی متناسب با نیازهای کسب و کار شما ارائه دهد.'
                  : 'Our team is ready to provide custom solutions tailored to your business needs.'}
              </p>
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="bg-background text-foreground hover:bg-background/90"
              >
                <Link to="/contact">{t('contact.title')}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

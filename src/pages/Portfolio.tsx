import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { portfolioAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';

const categories = [
  { id: 'all', label: 'portfolio.all' },
  { id: 'website', label: 'portfolio.website' },
  { id: 'app', label: 'portfolio.app' },
  { id: 'graphic', label: 'portfolio.graphic' },
];

export default function Portfolio() {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const isRTL = i18n.language === 'fa';

  // Fetch projects
  const { data: projectsData, isLoading } = useQuery({
    queryKey: ['projects', activeCategory],
    queryFn: () =>
      portfolioAPI.getProjects(
        activeCategory !== 'all' ? { category: activeCategory } : undefined
      ),
    staleTime: 5 * 60 * 1000,
  });

  // Fetch stats
  const { data: statsData } = useQuery({
    queryKey: ['portfolio-stats'],
    queryFn: () => portfolioAPI.getStats(),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    document.title = t('portfolio.title') + ' - App@B2B';
  }, [t]);

  const projects = projectsData?.data?.results || [];
  const stats = statsData?.data || {};

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
              {t('portfolio.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('portfolio.subtitle')}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {[
              { value: stats.total_projects || 0, label: t('portfolio.all') },
              { value: stats.completed_projects || 0, label: t('about.stats.projects') },
              { value: stats.featured_projects || 0, label: 'Featured' },
              { value: stats.categories_count || 0, label: 'Categories' },
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-muted">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                onClick={() => setActiveCategory(category.id)}
                className="min-w-[100px]"
              >
                {t(category.label)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {projects.map((project: any, index: number) => (
                  <motion.div
                    key={project.id}
                    className="group relative rounded-2xl overflow-hidden bg-card border hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={project.featured_image || '/placeholder-project.jpg'}
                        alt={isRTL ? project.title_fa : project.title_en}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Overlay Actions */}
                      <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button size="sm" asChild>
                          <Link to={`/portfolio/${project.slug}`}>
                            {t('portfolio.view_details')}
                          </Link>
                        </Button>
                        {project.project_url && (
                          <Button size="sm" variant="outline" asChild>
                            <a
                              href={project.project_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          {isRTL
                            ? project.category?.name_fa
                            : project.category?.name_en}
                        </span>
                        {project.is_featured && (
                          <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-500">
                            Featured
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {isRTL ? project.title_fa : project.title_en}
                      </h3>

                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {isRTL
                          ? project.short_description_fa
                          : project.short_description_en}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1">
                        {project.technologies?.slice(0, 4).map((tech: string, techIndex: number) => (
                          <span
                            key={techIndex}
                            className="px-2 py-0.5 text-xs rounded bg-muted text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies?.length > 4 && (
                          <span className="px-2 py-0.5 text-xs rounded bg-muted text-muted-foreground">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {!isLoading && projects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">
                {isRTL
                  ? 'هیچ پروژه‌ای در این دسته‌بندی یافت نشد.'
                  : 'No projects found in this category.'}
              </p>
            </div>
          )}
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
                  ? 'یک ایده عالی دارید؟'
                  : 'Have a great idea?'}
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
                {isRTL
                  ? 'بیایید با هم روی پروژه بعدی شما کار کنیم.'
                  : 'Let\'s work together on your next project.'}
              </p>
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="bg-background text-foreground hover:bg-background/90"
              >
                <Link to="/contact">
                  {t('contact.title')}
                  <ArrowRight className={`ml-2 h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

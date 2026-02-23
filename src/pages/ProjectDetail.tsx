import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { portfolioAPI } from '@/lib/api';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Github, Calendar, User, Check } from 'lucide-react';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  // Fetch project
  const { data: projectData, isLoading } = useQuery({
    queryKey: ['project', slug],
    queryFn: () => portfolioAPI.getProject(slug!),
    enabled: !!slug,
  });

  // Fetch related projects
  const { data: relatedData } = useQuery({
    queryKey: ['related-projects', slug],
    queryFn: () => portfolioAPI.getRelatedProjects(slug!),
    enabled: !!slug,
  });

  const project = projectData?.data;
  const relatedProjects = relatedData?.data || [];

  useEffect(() => {
    if (project) {
      document.title = (isRTL ? project.title_fa : project.title_en) + ' - App@B2B';
    }
  }, [project, isRTL]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {isRTL ? 'پروژه یافت نشد' : 'Project not found'}
          </h1>
          <Button asChild>
            <Link to="/portfolio">{t('portfolio.title')}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh]">
        <div className="absolute inset-0">
          <img
            src={project.featured_image || '/placeholder-project.jpg'}
            alt={isRTL ? project.title_fa : project.title_en}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="outline" size="sm" asChild className="mb-4">
              <Link to="/portfolio">
                <ArrowLeft className={`mr-2 h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                {t('common.back')}
              </Link>
            </Button>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">
                {isRTL ? project.category?.name_fa : project.category?.name_en}
              </Badge>
              {project.is_featured && (
                <Badge variant="default">
                  {isRTL ? 'ویژه' : 'Featured'}
                </Badge>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold">
              {isRTL ? project.title_fa : project.title_en}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Main Content */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  {isRTL ? 'درباره پروژه' : 'About Project'}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {isRTL ? project.description_fa : project.description_en}
                </p>
              </div>

              {/* Features */}
              {(project.features_fa?.length > 0 || project.features_en?.length > 0) && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    {isRTL ? 'ویژگی‌ها' : 'Features'}
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(isRTL ? project.features_fa : project.features_en)?.map(
                      (feature: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {/* Gallery */}
              {project.gallery?.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    {isRTL ? 'گالری تصاویر' : 'Gallery'}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {project.gallery.map((image: string, index: number) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden">
                        <img
                          src={image}
                          alt={`${isRTL ? project.title_fa : project.title_en} - ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6 space-y-6">
                  {/* Technologies */}
                  <div>
                    <h3 className="font-semibold mb-3">{t('portfolio.technologies')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.map((tech: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Client */}
                  {project.client_name && (
                    <div>
                      <h3 className="font-semibold mb-2">{t('portfolio.client')}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{project.client_name}</span>
                      </div>
                    </div>
                  )}

                  {/* Dates */}
                  <div>
                    <h3 className="font-semibold mb-2">
                      {isRTL ? 'تاریخ' : 'Date'}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {project.start_date &&
                          new Date(project.start_date).toLocaleDateString(
                            isRTL ? 'fa-IR' : 'en-US'
                          )}
                        {project.completion_date &&
                          ` - ${new Date(project.completion_date).toLocaleDateString(
                            isRTL ? 'fa-IR' : 'en-US'
                          )}`}
                      </span>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-col gap-2">
                    {project.project_url && (
                      <Button asChild variant="outline" className="w-full">
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          {t('portfolio.project_url')}
                        </a>
                      </Button>
                    )}
                    {project.github_url && (
                      <Button asChild variant="outline" className="w-full">
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          {t('portfolio.github')}
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">
              {isRTL ? 'پروژه‌های مرتبط' : 'Related Projects'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProjects.map((project: any) => (
                <Link key={project.id} to={`/portfolio/${project.slug}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.featured_image || '/placeholder-project.jpg'}
                        alt={isRTL ? project.title_fa : project.title_en}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold truncate">
                        {isRTL ? project.title_fa : project.title_en}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

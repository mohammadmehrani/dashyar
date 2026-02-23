import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Send } from 'lucide-react';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  const quickLinks = [
    { href: '/', label: 'nav.home' },
    { href: '/services', label: 'nav.services' },
    { href: '/portfolio', label: 'nav.portfolio' },
    { href: '/about', label: 'nav.about' },
    { href: '/contact', label: 'nav.contact' },
  ];

  const services = [
    { href: '/services', label: 'services.web_development.title' },
    { href: '/services', label: 'services.mobile_app.title' },
    { href: '/services', label: 'services.ai.title' },
    { href: '/services', label: 'services.design.title' },
  ];

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                App@B2B
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.quick_links')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {t(service.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  {isRTL
                    ? 'تهران، ایران'
                    : 'Tehran, Iran'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@appb2b.com"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  info@appb2b.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href="tel:+989123456789"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  +98 912 345 6789
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} App@B2B. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/privacy"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              {isRTL ? 'حریم خصوصی' : 'Privacy Policy'}
            </Link>
            <Link
              to="/terms"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              {isRTL ? 'شرایط استفاده' : 'Terms of Service'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

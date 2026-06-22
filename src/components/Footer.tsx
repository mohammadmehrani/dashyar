import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CalendarDays, Clock3, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  const quickLinks = [
    { href: '/', label: 'nav.home' },
    { href: '/services', label: 'nav.services' },
    { href: '/about', label: 'nav.about' },
    { href: '/contact', label: 'nav.contact' },
  ];

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-black text-emerald-700">{t('app.name')}</span>
            </Link>
            <p className="text-sm leading-7 text-muted-foreground">{t('footer.tagline')}</p>
            <div className="flex items-center gap-3">
              <a
                href="tel:+982151234567"
                className="rounded-full border bg-background p-2 transition-colors hover:bg-emerald-500 hover:text-white"
                aria-label="phone"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href="mailto:info@drkimiahabibi.com"
                className="rounded-full border bg-background p-2 transition-colors hover:bg-emerald-500 hover:text-white"
                aria-label="email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">{t('footer.quick_links')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">{t('footer.services')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{isRTL ? 'فیزیوتراپی و درمان دستی' : 'Physiotherapy & manual therapy'}</li>
              <li>{isRTL ? 'شاک ویو و لیزر پرتوان' : 'Shockwave & high-power laser'}</li>
              <li>{isRTL ? 'طب فیزیکی و توانبخشی' : 'Physical medicine & rehab'}</li>
              <li>{isRTL ? 'ورزش درمانی' : 'Exercise therapy'}</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-700" />
                <span className="text-sm text-muted-foreground">{isRTL ? 'رباط‌کریم، تهران' : 'Robat Karim, Tehran'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-emerald-700" />
                <a href="tel:+982151234567" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  +98 21 5123 4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-emerald-700" />
                <a href="mailto:info@drkimiahabibi.com" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  info@drkimiahabibi.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock3 className="h-4 w-4 flex-shrink-0 text-emerald-700" />
                <span className="text-sm text-muted-foreground">
                  {isRTL ? 'شنبه تا چهارشنبه ۹ تا ۱۸' : 'Sat to Wed, 9:00 to 18:00'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {t('app.name')}. {t('footer.rights')}
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <CalendarDays className="h-4 w-4" />
            {isRTL ? 'رزرو نوبت' : 'Book an appointment'}
          </Link>
        </div>
      </div>
    </footer>
  );
}

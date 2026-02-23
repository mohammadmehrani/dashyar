import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { getLanguageDirection } from '@/i18n';

export default function MainLayout() {
  const { i18n } = useTranslation();
  const direction = getLanguageDirection(i18n.language);

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      dir={direction}
    >
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <LanguageSwitcher />
    </div>
  );
}

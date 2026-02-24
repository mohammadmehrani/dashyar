import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Globe, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'fa', name: 'فارسی', short: 'FA' },
  { code: 'en', name: 'English', short: 'EN' },
];

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language.startsWith('fa') ? 'fa' : 'en';

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('i18nextLng', langCode);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full border-2 border-primary/20 bg-background shadow-lg transition-shadow hover:border-primary hover:shadow-xl"
        >
          <Globe className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="end" side="top" sideOffset={8}>
        <div className="space-y-1">
          <p className="px-2 py-1 text-xs font-medium text-muted-foreground">
            {t('language.switch')}
          </p>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={cn(
                'flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors',
                currentLang === lang.code
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent'
              )}
            >
              <span className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold">
                  {lang.short}
                </span>
                <span>{lang.name}</span>
              </span>
              {currentLang === lang.code && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

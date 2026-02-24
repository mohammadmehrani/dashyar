import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, User, LogOut, LayoutDashboard, Shield, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

const mainNav = [
  { href: '/', label: 'nav.home' },
  { href: '/portfolio', label: 'nav.portfolio' },
  { href: '/contact', label: 'nav.contact' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isRTL = i18n.language === 'fa';
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-background/90 backdrop-blur-md' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div
          className={cn(
            'mt-3 flex h-16 items-center justify-between rounded-2xl px-3 border transition-all',
            isScrolled ? 'bg-background shadow-sm' : 'bg-background/70 backdrop-blur-md border-white/40'
          )}
        >
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-accent"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span className="text-2xl font-extrabold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              Dashyar
            </span>
            {isDark ? <Sun className="h-4 w-4 text-primary" /> : <Moon className="h-4 w-4 text-primary" />}
          </button>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">{t('nav.services')}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[520px] grid-cols-2 gap-3 p-4">
                    {[
                      '/services',
                      '/services',
                      '/services',
                      '/services',
                    ].map((href, index) => (
                      <NavigationMenuLink asChild key={`${href}-${index}`}>
                        <Link to={href} className="rounded-xl border p-3 hover:bg-accent">
                          <p className="text-sm font-semibold">
                            {index === 0
                              ? t('services.web_development.title')
                              : index === 1
                              ? t('services.mobile_app.title')
                              : index === 2
                              ? t('services.ai.title')
                              : t('services.design.title')}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {t('services.subtitle')}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">{t('nav.about')}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[340px] p-4">
                    <NavigationMenuLink asChild>
                      <Link to="/about" className="block rounded-xl border p-3 hover:bg-accent">
                        <p className="text-sm font-semibold">{t('about.title')}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{t('about.description')}</p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {mainNav.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link to={item.href}>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'bg-transparent',
                        location.pathname === item.href && 'text-primary font-semibold'
                      )}
                    >
                      {t(item.label)}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.avatar} alt={user?.full_name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user?.first_name?.[0]}{user?.last_name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align={isRTL ? 'start' : 'end'} forceMount>
                  <div className="flex items-center gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.full_name} />
                      <AvatarFallback>{user?.first_name?.[0]}{user?.last_name?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium">{user?.full_name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      {t('nav.dashboard')}
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin">
                        <Shield className="mr-2 h-4 w-4" />
                        {t('nav.admin')}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/profile">
                      <User className="mr-2 h-4 w-4" />
                      {t('dashboard.profile')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('auth.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">{t('nav.login')}</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">{t('nav.register')}</Link>
                </Button>
              </div>
            )}

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side={isRTL ? 'right' : 'left'} className="w-[300px]">
                <div className="mt-8 space-y-4">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-accent"
                  >
                    <span className="text-xl font-bold">Dashyar</span>
                    {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </button>

                  <nav className="flex flex-col gap-2">
                    {[...mainNav, { href: '/services', label: 'nav.services' }, { href: '/about', label: 'nav.about' }].map((item) => (
                      <Link
                        key={item.href + item.label}
                        to={item.href}
                        className={cn(
                          'rounded-lg px-4 py-2 transition-colors',
                          location.pathname === item.href ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {t(item.label)}
                      </Link>
                    ))}
                  </nav>

                  {!isAuthenticated && (
                    <div className="mt-4 border-t pt-4 space-y-2">
                      <Button variant="outline" asChild className="w-full">
                        <Link to="/login" onClick={() => setIsOpen(false)}>
                          {t('nav.login')}
                        </Link>
                      </Button>
                      <Button asChild className="w-full">
                        <Link to="/register" onClick={() => setIsOpen(false)}>
                          {t('nav.register')}
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

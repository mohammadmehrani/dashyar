import { useEffect, useState } from 'react';
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
import { CalendarDays, LogOut, Menu, Moon, Shield, Sun, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const mainNav = [
  { href: '/', label: 'nav.home' },
  { href: '/services', label: 'nav.services' },
  { href: '/about', label: 'nav.about' },
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
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-background/90 backdrop-blur-md' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div
          className={cn(
            'mt-3 flex h-16 items-center justify-between rounded-2xl border px-3 transition-all',
            isScrolled ? 'bg-background shadow-sm' : 'border-white/50 bg-background/75 backdrop-blur-md'
          )}
        >
          <Link to="/" className="flex items-center gap-3 rounded-xl px-2 py-1.5">
            <span className="text-lg font-black tracking-tight text-emerald-700 md:text-xl">
              {t('app.name')}
            </span>
          </Link>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  {t('nav.services')}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[420px] p-4">
                    <div className="grid gap-3">
                      {[
                        {
                          href: '/services',
                          title: isRTL ? 'فیزیوتراپی و درمان دستی' : 'Physiotherapy & manual therapy',
                          text: isRTL ? 'تمرکز بر دردهای عضلانی و اسکلتی' : 'Focused on musculoskeletal pain',
                        },
                        {
                          href: '/services',
                          title: isRTL ? 'شاک ویو و لیزر پرتوان' : 'Shockwave & high-power laser',
                          text: isRTL ? 'کمک درمانی برای کاهش درد' : 'Adjunct care for pain reduction',
                        },
                      ].map((item) => (
                        <NavigationMenuLink asChild key={item.title}>
                          <Link to={item.href} className="rounded-2xl border p-4 transition-colors hover:bg-accent">
                            <p className="text-sm font-semibold">{item.title}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{item.text}</p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {mainNav.slice(0, 3).map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link to={item.href}>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'bg-transparent',
                        location.pathname === item.href && 'font-semibold text-emerald-700'
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
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden md:inline-flex"
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Button asChild className="hidden md:inline-flex">
              <Link to="/contact">
                <CalendarDays className="mr-2 h-4 w-4" />
                {t('nav.contact')}
              </Link>
            </Button>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.avatar} alt={user?.full_name} />
                      <AvatarFallback className="bg-emerald-600 text-white">
                        {user?.first_name?.[0]}
                        {user?.last_name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align={isRTL ? 'start' : 'end'} forceMount>
                  <div className="flex items-center gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.full_name} />
                      <AvatarFallback>
                        {user?.first_name?.[0]}
                        {user?.last_name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium">{user?.full_name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">
                      <Shield className="mr-2 h-4 w-4" />
                      {t('nav.dashboard')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/profile">
                      <User className="mr-2 h-4 w-4" />
                      {t('dashboard.profile')}
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
                  <Link to="/contact">{isRTL ? 'رزرو نوبت' : 'Book now'}</Link>
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
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-emerald-700">{t('app.name')}</span>
                    <Button variant="ghost" size="icon" onClick={toggleTheme}>
                      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>
                  </div>

                  <nav className="flex flex-col gap-2">
                    {mainNav.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={cn(
                          'rounded-xl px-4 py-2 transition-colors',
                          location.pathname === item.href ? 'bg-emerald-600 text-white' : 'hover:bg-accent'
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {t(item.label)}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-4 border-t pt-4 space-y-2">
                    <Button asChild className="w-full">
                      <Link to="/contact" onClick={() => setIsOpen(false)}>
                        {isRTL ? 'رزرو نوبت' : 'Book now'}
                      </Link>
                    </Button>
                    {!isAuthenticated && (
                      <Button variant="outline" asChild className="w-full">
                        <Link to="/login" onClick={() => setIsOpen(false)}>
                          {t('nav.login')}
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

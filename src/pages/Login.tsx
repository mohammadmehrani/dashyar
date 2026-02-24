import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
      toast.success(t('auth.login.success'));
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || t('auth.login.failed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t('auth.login.title')}</CardTitle>
            <CardDescription>{t('auth.login.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.login.email')}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                    required
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.login.password')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('auth.login.loading')}
                  </>
                ) : (
                  t('auth.login.submit')
                )}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">{t('auth.login.no_account')} </span>
              <Link to="/register" className="text-primary hover:underline font-medium">
                {t('auth.login.register')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

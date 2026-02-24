import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useMutation, useQuery } from '@tanstack/react-query';
import { coreAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';
  type ContactFormState = {
    name: string;
    email: string;
    phone: string;
    company: string;
    service_type: string;
    budget: string;
    subject: string;
    message: string;
  };
  type ContactApiPayload = {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  };

  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service_type: '',
    budget: '',
    subject: '',
    message: '',
  });

  const { data: contactInfoData } = useQuery({
    queryKey: ['contact-info'],
    queryFn: () => coreAPI.getContactInfo(),
    staleTime: 5 * 60 * 1000,
  });

  const contactInfo = contactInfoData?.data?.[0] || {};

  const sendMessageMutation = useMutation({
    mutationFn: (data: ContactApiPayload) => coreAPI.sendContactMessage(data),
    onSuccess: () => {
      toast.success(t('contact.form.success'));
    setFormData({ name: '', email: '', phone: '', company: '', service_type: '', budget: '', subject: '', message: '' });
    },
    onError: () => toast.error(t('contact.form.error')),
  });

  useEffect(() => {
    document.title = `${t('contact.title')} - Dashyar`;
  }, [t]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const composedMessage = [
      formData.message,
      formData.company ? `\nCompany: ${formData.company}` : '',
      formData.service_type ? `\nService: ${formData.service_type}` : '',
      formData.budget ? `\nBudget: ${formData.budget}` : '',
    ].join('');

    const payload: ContactApiPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: composedMessage,
    };

    sendMessageMutation.mutate(payload);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((current: ContactFormState) => ({ ...current, [event.target.name]: event.target.value }));
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold">{t('contact.title')}</h1>
            <p className="mt-5 text-muted-foreground md:text-lg">{t('contact.subtitle')}</p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <motion.div
              className="space-y-4 lg:col-span-1"
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6 space-y-5">
                  <div className="flex gap-3">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">{t('contact.email')}</h3>
                      <p className="text-sm text-muted-foreground">{contactInfo.email || 'hello@dashyar.com'}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">{t('contact.phone')}</h3>
                      <p className="text-sm text-muted-foreground">{contactInfo.phone1 || '+98 912 000 0000'}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">{t('contact.address')}</h3>
                      <p className="text-sm text-muted-foreground">
                        {isRTL ? contactInfo.address_fa || t('contact.city') : contactInfo.address_en || t('contact.city')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-semibold mb-6">{t('contact.form.title')}</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t('contact.form.name')}</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('contact.form.email')}</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t('contact.form.phone')}</Label>
                        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">{t('contact.form.subject')}</Label>
                        <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">{isRTL ? 'نام شرکت' : 'Company'}</Label>
                        <Input id="company" name="company" value={formData.company} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service_type">{isRTL ? 'نوع خدمت' : 'Service Type'}</Label>
                        <Input
                          id="service_type"
                          name="service_type"
                          value={formData.service_type}
                          onChange={handleChange}
                          placeholder={isRTL ? 'وب، موبایل، هوش مصنوعی...' : 'Web, Mobile, AI...'}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="budget">{isRTL ? 'بازه بودجه' : 'Budget Range'}</Label>
                        <Input
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          placeholder={isRTL ? 'مثلا ۵۰ تا ۱۰۰ میلیون' : 'e.g. $5k - $10k'}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">{t('contact.form.message')}</Label>
                      <Textarea id="message" name="message" rows={6} value={formData.message} onChange={handleChange} required />
                    </div>
                    <Button type="submit" size="lg" className="w-full" disabled={sendMessageMutation.isPending}>
                      {sendMessageMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t('contact.form.sending')}
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          {t('contact.form.send')}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { coreAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Clock3, Loader2, MapPin, Mail, Phone, Send, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  preferredDate: string;
  message: string;
};

export default function Contact() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    preferredDate: '',
    message: '',
  });

  const submitMutation = useMutation({
    mutationFn: (data: { name: string; email: string; phone?: string; subject: string; message: string }) =>
      coreAPI.sendContactMessage(data),
    onSuccess: () => {
      toast.success(t('contact.form.success'));
      setFormData({ name: '', email: '', phone: '', subject: '', preferredDate: '', message: '' });
    },
    onError: () => toast.error(t('contact.form.error')),
  });

  useEffect(() => {
    document.title = `${t('contact.title')} - ${t('app.name')}`;
  }, [t]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const message = [
      formData.message,
      formData.preferredDate ? `${isRTL ? 'تاریخ پیشنهادی' : 'Preferred date'}: ${formData.preferredDate}` : '',
    ]
      .filter(Boolean)
      .join('\n\n');

    submitMutation.mutate({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      subject: formData.subject || (isRTL ? 'درخواست نوبت' : 'Appointment request'),
      message,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const clinicInfo = [
    {
      icon: MapPin,
      title: t('contact.address'),
      value: isRTL ? 'رباط‌کریم، تهران' : 'Robat Karim, Tehran',
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      value: isRTL ? 'برای نوبت با شماره مطب تماس بگیرید' : 'Call the clinic number to book',
    },
    {
      icon: Mail,
      title: t('contact.email'),
      value: 'info@drkimiahabibi.com',
    },
    {
      icon: Clock3,
      title: isRTL ? 'ساعات پاسخ‌گویی' : 'Response hours',
      value: isRTL ? 'شنبه تا چهارشنبه، ۹ تا ۱۸' : 'Sat to Wed, 9:00 to 18:00',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              {isRTL ? 'نوبت‌گیری سریع' : 'Quick booking'}
            </div>
            <h1 className="mt-5 text-4xl font-black md:text-6xl">{t('contact.title')}</h1>
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
              <Card className="rounded-[1.75rem]">
                <CardContent className="space-y-5 p-6">
                  {clinicInfo.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex gap-3">
                        <Icon className="mt-1 h-5 w-5 text-emerald-700" />
                        <div>
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="rounded-[1.75rem]">
                <CardContent className="p-6 md:p-8">
                  <h2 className="mb-6 text-2xl font-black">{t('contact.form.title')}</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t('contact.form.name')}</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t('contact.form.phone')}</Label>
                        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('contact.form.email')}</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">{t('contact.form.subject')}</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder={isRTL ? 'فیزیوتراپی، شاک ویو، طب فیزیکی...' : 'Physiotherapy, shockwave, rehab...'}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferredDate">{isRTL ? 'تاریخ پیشنهادی' : 'Preferred date'}</Label>
                      <Input id="preferredDate" name="preferredDate" type="date" value={formData.preferredDate} onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{t('contact.form.message')}</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder={isRTL ? 'شرح مشکل، مدت درد و هر نکته مهم دیگر' : 'Describe the problem, duration, and any important notes'}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={submitMutation.isPending}>
                      {submitMutation.isPending ? (
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

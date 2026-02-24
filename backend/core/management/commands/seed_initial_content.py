from django.core.management.base import BaseCommand

from core.models import AboutSection, ContactInfo, HeroSection, Service, TeamMember


class Command(BaseCommand):
    help = "Seed initial bilingual content for a production-like website experience."

    def handle(self, *args, **options):
        HeroSection.objects.update_or_create(
            order=0,
            defaults={
                "title_fa": "توسعه محصول دیجیتال برای کسب‌وکارهای در حال رشد",
                "title_en": "Digital Product Engineering for Growing Businesses",
                "subtitle_fa": "از طراحی تا پیاده‌سازی، تیم دشیار کنار شماست تا سریع‌تر به بازار برسید.",
                "subtitle_en": "From design to deployment, Dashyar helps you ship faster with confidence.",
                "cta_button_text_fa": "مشاهده خدمات",
                "cta_button_text_en": "Explore Services",
                "secondary_button_text_fa": "شروع همکاری",
                "secondary_button_text_en": "Start Collaboration",
                "cta_button_link": "/services",
                "secondary_button_link": "/contact",
                "is_active": True,
            },
        )

        service_rows = [
            (
                0,
                "توسعه وب",
                "Web Development",
                "طراحی و توسعه اپلیکیشن‌های وب مقیاس‌پذیر و امن.",
                "Scalable and secure web application development.",
                "code",
            ),
            (
                1,
                "توسعه موبایل",
                "Mobile Development",
                "ساخت اپلیکیشن‌های موبایل با تجربه کاربری روان و سریع.",
                "High-performance mobile applications with smooth UX.",
                "smartphone",
            ),
            (
                2,
                "هوش مصنوعی",
                "AI Solutions",
                "پیاده‌سازی ابزارهای هوشمند برای تحلیل داده و اتوماسیون.",
                "Applied AI for analytics, automation, and personalization.",
                "brain",
            ),
        ]

        for order, title_fa, title_en, description_fa, description_en, icon in service_rows:
            Service.objects.update_or_create(
                order=order,
                defaults={
                    "title_fa": title_fa,
                    "title_en": title_en,
                    "description_fa": description_fa,
                    "description_en": description_en,
                    "icon": icon,
                    "is_active": True,
                },
            )

        AboutSection.objects.update_or_create(
            is_active=True,
            defaults={
                "title_fa": "درباره دشیار",
                "title_en": "About Dashyar",
                "description_fa": "ما یک تیم محصول‌محور هستیم که بر تحویل سریع، کیفیت فنی بالا و نتیجه واقعی تمرکز دارد.",
                "description_en": "We are a product-focused team delivering fast, stable software with measurable outcomes.",
                "projects_completed": 70,
                "happy_clients": 40,
                "awards_won": 12,
                "years_experience": 9,
            },
        )

        ContactInfo.objects.update_or_create(
            email="hello@dashyar.com",
            defaults={
                "phone1": "+989120000000",
                "phone2": "+989120000001",
                "address_fa": "تهران، ایران",
                "address_en": "Tehran, Iran",
                "is_active": True,
                "linkedin": "https://linkedin.com",
                "twitter": "https://twitter.com",
                "telegram": "https://t.me",
                "instagram": "https://instagram.com",
            },
        )

        TeamMember.objects.update_or_create(
            order=0,
            defaults={
                "name_fa": "تیم دشیار",
                "name_en": "Dashyar Team",
                "position_fa": "توسعه محصول",
                "position_en": "Product Engineering",
                "bio_fa": "تیمی چندتخصصی برای توسعه نرم‌افزار، تجربه کاربری و مقیاس‌پذیری.",
                "bio_en": "A multi-disciplinary team covering software delivery, UX, and scaling.",
                "skills": ["React", "Django", "PostgreSQL", "DevOps"],
                "experience_years": 9,
                "projects_count": 70,
                "is_active": True,
            },
        )

        self.stdout.write(self.style.SUCCESS("Initial content seeded successfully."))

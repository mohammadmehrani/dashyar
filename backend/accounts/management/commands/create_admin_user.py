import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = "Create or update a default admin user for dashboard and Django admin login."

    def add_arguments(self, parser):
        parser.add_argument("--email", default=os.getenv("ADMIN_EMAIL", "mehrani1992@gmail.com"))
        parser.add_argument("--password", default=os.getenv("ADMIN_PASSWORD"))
        parser.add_argument("--first-name", default=os.getenv("ADMIN_FIRST_NAME", "Dashyar"))
        parser.add_argument("--last-name", default=os.getenv("ADMIN_LAST_NAME", "Admin"))
        parser.add_argument("--username", default=os.getenv("ADMIN_USERNAME", "dashyar_admin"))

    def handle(self, *args, **options):
        if not options["password"]:
            raise CommandError(
                "ADMIN_PASSWORD is required. "
                "Pass --password or set env var."
            )

        user_model = get_user_model()
        email = options["email"].strip().lower()
        defaults = {
            "username": options["username"],
            "first_name": options["first_name"],
            "last_name": options["last_name"],
        }

        user, created = user_model.objects.get_or_create(email=email, defaults=defaults)
        user.username = options["username"]
        user.first_name = options["first_name"]
        user.last_name = options["last_name"]
        user.user_type = "admin"
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.set_password(options["password"])
        user.save()

        if created:
            self.stdout.write(self.style.SUCCESS(f"Admin user created: {email}"))
        else:
            self.stdout.write(self.style.SUCCESS(f"Admin user updated: {email}"))

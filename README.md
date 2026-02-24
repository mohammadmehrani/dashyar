# Dashyar (React + Django)

Fullstack bilingual website with:
- Frontend: React + Vite + TypeScript + Tailwind
- Backend: Django + DRF + JWT

## Local Run

### 1) Backend
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py create_admin_user --email admin@dashyar.com --password Admin@123456
python manage.py seed_initial_content
python manage.py runserver
```

### 2) Frontend
```bash
npm ci
npm run dev
```

Frontend runs on `http://localhost:3000` and proxies `/api` to Django.

## Admin Login

- URL: `http://localhost:8000/admin/`
- Default command example:
```bash
python manage.py create_admin_user --email admin@dashyar.com --password Admin@123456
```

You can also use env vars:
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_USERNAME`
- `ADMIN_FIRST_NAME`
- `ADMIN_LAST_NAME`

## Deploy Notes

### Vercel (Frontend)
- `vercel.json` is configured for Vite SPA rewrites.
- Set `VITE_API_URL` to your deployed backend API URL.

### Backend
- Configure:
  - `DEBUG=False`
  - `ALLOWED_HOSTS`
  - `CORS_ALLOWED_ORIGINS`
  - `CSRF_TRUSTED_ORIGINS`

## GitHub Actions

`.github/workflows/django.yml` now runs a fullstack CI:
- Frontend: `npm ci`, `npm run lint`, `npm run build`
- Backend: `pip install -r backend/requirements.txt`, `manage.py check`, `manage.py test`

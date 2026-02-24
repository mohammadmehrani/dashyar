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
python manage.py create_admin_user --email YOUR_EMAIL --password YOUR_STRONG_PASSWORD
python manage.py seed_initial_content
python manage.py runserver
```

Or on Windows run one command:
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\bootstrap-backend.ps1
```

### 2) Frontend
```bash
npm ci
npm run dev
```

Frontend runs on `http://localhost:3000` and proxies `/api` to Django.

## Admin Login

- URL: `http://localhost:8000/admin/`
- Create admin (example):
```bash
python manage.py create_admin_user --email YOUR_EMAIL --password YOUR_STRONG_PASSWORD
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

### Local frontend built from `dist`
- If you open built frontend locally, set:
  - `VITE_API_URL=http://127.0.0.1:8000/api`

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

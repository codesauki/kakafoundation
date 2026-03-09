# Kowa Namu Ne Foundation — Website

**"Come With Us"** — The official website for the Kowa Namu Ne Foundation, founded by Hon. Abdulazeez Kaka.

A full-stack Next.js 14 website with public pages, a multi-step scholarship application portal, and a complete super admin dashboard.

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+
- PostgreSQL database (or [Neon](https://neon.tech) free tier)
- Cloudinary account (free tier works)

### 2. Clone & Install
```bash
git clone <repo-url>
cd kowa-foundation
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local` and fill in all values:

```bash
cp .env.example .env.local
```

Required variables:
| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_URL` | Your deployment URL (e.g. `http://localhost:3000`) |
| `NEXTAUTH_SECRET` | Random secret (generate with `openssl rand -base64 32`) |
| `CLOUDINARY_CLOUD_NAME` | From your Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | From your Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | From your Cloudinary dashboard |

### 4. Database Setup
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

The seed creates:
- Super admin user: `admin@kowanamunejoundation.org` (password via `ADMIN_PASSWORD` env var)
- Founder profile for Hon. Abdulazeez Kaka
- All 7 programme entries
- Sample news articles
- Default site settings

### 5. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` for the public site.
Visit `http://localhost:3000/admin` for the admin dashboard.

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth.js (JWT) |
| File Storage | Cloudinary |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Animations | Framer Motion + CSS |

---

## 🗂️ Project Structure

```
kowa-foundation/
├── app/
│   ├── (admin)/           # Auth-protected admin routes
│   │   ├── login/         # Admin login page
│   │   └── admin/         # Dashboard modules
│   ├── api/               # Next.js API routes
│   │   ├── applications/  # Scholarship applications CRUD
│   │   ├── auth/          # NextAuth handler
│   │   ├── news/          # News management
│   │   ├── founder/       # Founder profile
│   │   ├── contact/       # Contact form
│   │   ├── upload/        # Cloudinary file upload
│   │   ├── gallery/       # Media gallery
│   │   └── admin/         # Admin-only (stats, staff)
│   ├── about/             # About the Foundation
│   ├── apply/             # Scholarship application form
│   ├── contact/           # Contact page
│   ├── education/         # Education portal landing
│   ├── founder/           # Founder biography
│   ├── gallery/           # Photo gallery
│   ├── news/              # News listing + articles
│   └── programmes/        # Programme pages
├── components/
│   ├── admin/             # Admin dashboard components
│   ├── application/       # Multi-step application form
│   ├── layout/            # Navbar, Footer
│   ├── sections/          # Page sections (Hero, Impact, etc.)
│   └── ui/                # Reusable UI components
├── data/
│   └── nigeria-geo.ts     # All 36 states, 774 LGAs, wards
├── lib/
│   ├── auth.ts            # NextAuth configuration
│   ├── cloudinary.ts      # File upload helpers
│   ├── db.ts              # Prisma client singleton
│   └── utils.ts           # Shared utilities
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Initial data seeding
└── types/
    └── next-auth.d.ts     # Session type extensions
```

---

## 🌐 Public Pages

| Route | Page |
|---|---|
| `/` | Homepage with hero, stats, programmes, founder preview, news |
| `/about` | Foundation mission, vision, values, structure |
| `/founder` | Hon. Abdulazeez Kaka biography page |
| `/programmes` | All 7 programme listings |
| `/programmes/[slug]` | Individual programme detail |
| `/education` | Scholarship portal landing (how it works, FAQs) |
| `/apply` | 5-step scholarship application form |
| `/apply/success` | Post-submission confirmation + reference number |
| `/news` | News article listing |
| `/news/[slug]` | Individual article page |
| `/gallery` | Photo gallery grid |
| `/contact` | Contact form + office details |

---

## 🔐 Admin Dashboard (`/admin`)

Login with seeded credentials, then access:

| Module | Path | Description |
|---|---|---|
| Dashboard | `/admin` | Live stats, weekly chart, recent applications |
| Applications | `/admin/applications` | Search, filter, review all applications |
| Application Detail | `/admin/applications/[id]` | Full application with status controls |
| News Manager | `/admin/news-admin` | Create/edit/publish articles |
| Founder Profile | `/admin/founder-admin` | Edit bio, photo, achievements |
| Site Content | `/admin/content` | Toggle applications, update announcements |
| Media Library | `/admin/media` | Upload/manage Cloudinary images |
| Staff Accounts | `/admin/staff` | Add/remove admin users (Super Admin only) |
| Settings | `/admin/settings` | Change password, system info |

---

## 🇳🇬 Nigeria Geographic Data

The application form uses **complete Nigerian administrative data**:
- All **36 states + FCT Abuja**
- All **774 Local Government Areas**
- Ward-level data for each LGA

Cascading dropdowns: State → LGA → Ward

---

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

Set all environment variables in Vercel dashboard under Project Settings → Environment Variables.

### After Deployment
```bash
# Run migrations on production database
npx prisma db push

# Seed production data
npx prisma db seed
```

---

## 🔑 Default Admin Credentials

```
Email: admin@kowanamunejoundation.org
```

The password is configured via the `ADMIN_PASSWORD` environment variable.

**⚠️ Set a strong password in your `.env` or hosting platform environment variables before deploying to production.**

---

## 📞 Support

For technical issues, contact the development team or open a GitHub issue.

For Foundation-related enquiries: **info@kowanamunejoundation.org**

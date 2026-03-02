# Kowa Namu Ne Foundation - Production Deployment Guide

## ✅ Build Status: COMPLETE

The application has been successfully built and is ready for production deployment.

### Build Summary
- **Framework**: Next.js 14.2.5 (App Router)
- **Build Date**: Latest
- **Build Status**: ✅ Success
- **Output Directory**: `.next/`
- **Build Type**: Optimized Production Build

## Deployment Requirements

### 1. Environment Variables
Create a `.env.production` file with the following variables (or configure in your hosting platform):

```env
# Database (PostgreSQL with Prisma ORM)
DATABASE_URL="postgresql://user:password@host:5432/kowa_foundation?sslmode=require"

# NextAuth Configuration
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"

# Cloudinary Image Storage
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"

# Email Notifications (SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="notifications@yourdomain.com"
SMTP_PASS="your-app-password"
ADMIN_EMAIL="admin@yourdomain.com"
```

### 2. Database Setup
Before deployment, ensure your PostgreSQL database is ready:

```bash
# Push schema to production database
npx prisma db push

# (Optional) Seed with initial data
npx prisma db seed
```

#### Database Models
The application uses 9 Prisma models:
- **AdminUser**: Admin dashboard users with role-based access
- **Application**: Scholarship applications from users
- **News**: Blog posts and announcements
- **FounderProfile**: Founder biography with achievements
- **Achievement**: Timeline of founder achievements
- **Programme**: Foundation programmes/initiatives
- **GalleryItem**: Media gallery images
- **SiteSetting**: Key-value configuration storage
- **ContactMessage**: Contact form submissions

### 3. Hosting Platforms

#### Option A: Vercel (Recommended for Next.js)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

Vercel will automatically:
- Detect the Next.js project
- Set environment variables from your dashboard
- Deploy with optimal configuration
- Provide CDN and edge caching

#### Option B: Self-Hosted (VPS/Docker)
```bash
# Install dependencies
npm install --legacy-peer-deps

# Build
npm run build

# Start server
npm start  # or pm2 start npm --name "kowa-app" -- start
```

Server will listen on `http://localhost:3000` by default.

#### Option C: Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build
ENV NODE_ENV production
EXPOSE 3000
CMD ["npm", "start"]
```

### 4. Route Configuration

#### Public Routes (Pre-rendered Static)
- `/` - Homepage
- `/about` - About page
- `/apply` - Scholarship application form
- `/contact` - Contact page
- `/education` - Education section
- `/founder` - Founder profile
- `/gallery` - Image gallery
- `/news` - News listing
- `/news/[slug]` - Individual news articles
- `/programmes` - Programmes listing
- `/programmes/[slug]` - Programme details

#### Admin Routes (Server-Rendered, Authentication Required)
- `/login` - Admin login page
- `/admin` - Admin dashboard (requires valid session)
- `/admin/applications` - Scholarship application management
- `/admin/applications/[id]` - Application detail view
- `/admin/content` - Site settings management
- `/admin/founder-admin` - Founder profile editor
- `/admin/media` - Media/gallery management
- `/admin/news-admin` - News article editor
- `/admin/settings` - Account settings
- `/admin/staff` - Admin staff management (super-admin only)

#### API Routes (Dynamic, Database-driven)
- `POST /api/applications` - Submit scholarship application
- `GET/PATCH/DELETE /api/applications/[id]` - Application management
- `GET /api/news` - Fetch news articles
- `GET /api/gallery` - Fetch gallery items
- `POST /api/upload` - Upload image to Cloudinary
- `DELETE /api/upload` - Delete image from Cloudinary
- `GET /api/content` - Fetch site settings
- `GET /api/founder` - Fetch founder profile
- `POST /api/contact` - Submit contact form
- `GET /api/admin/stats` - Dashboard statistics
- `CRUD /api/admin/staff` - Admin user management

### 5. Authentication

#### Admin Login Credentials
Default super-admin user (from seed data):
```
Email: admin@kowanamunejoundation.org
Password: (check seed.ts for initial password)
```

#### Session Management
- **Provider**: NextAuth.js with Credentials Provider
- **Session Strategy**: JWT (JSON Web Tokens)
- **Session Duration**: Configurable in `lib/auth.ts`
- **Protected Routes**: All `/admin/*` routes require valid authentication

### 6. Security Checklist

- [ ] Set `NEXTAUTH_SECRET` to a strong random value (openssl rand -base64 32)
- [ ] Use HTTPS in production (NEXTAUTH_URL must be https://)
- [ ] Configure CORS if API is accessed from different domain
- [ ] Set secure database credentials in production
- [ ] Enable PostgreSQL SSL/TLS connection
- [ ] Configure Cloudinary API credentials securely
- [ ] Set up SMTP credentials for email notifications
- [ ] Enable middleware authentication on `/admin` routes
- [ ] Configure CSRF protection (NextAuth handles this)
- [ ] Set secure session cookies (_Secure, _SameSite flags)

### 7. Performance Optimizations

The build includes:
- ✅ **Static Generation**: Public pages pre-rendered at build time
- ✅ **Code Splitting**: Automatic per-route JS bundles
- ✅ **Image Optimization**: Cloudinary CDN for media delivery
- ✅ **CSS Optimization**: Tailwind CSS with PurgeCSS
- ✅ **Font Optimization**: Google Fonts preloading
- ✅ **JavaScript Minimization**: Automatic in production
- ✅ **Compression**: Gzip enabled on all responses

### 8. Monitoring & Logging

#### Recommended Tools
- **Analytics**: Vercel Analytics, Google Analytics 4
- **Error Tracking**: Sentry, Datadog
- **Performance**: Web Vitals, Lighthouse
- **Database**: Prisma Studio for data inspection

#### Health Check Endpoint
```bash
curl https://yourdomain.com/api/health
# or use any public page to verify deployment
curl https://yourdomain.com/
```

### 9. Database Backup

```bash
# Backup PostgreSQL database
pg_dump -U user -h host kowa_foundation > backup.sql

# Restore from backup
psql -U user -h host kowa_foundation < backup.sql
```

### 10. Troubleshooting

#### Build Errors
If you encounter build errors after deployment:
1. Check Node.js version (14+ required, 18+ recommended)
2. Verify environment variables are set
3. Run `npm run build` locally first to test
4. Check `.next/` directory exists and has content

#### Runtime Errors
1. Check application logs: `npm start` with NODE_ENV=production
2. Verify DATABASE_URL connectivity
3. Check NEXTAUTH_SECRET is set correctly
4. Verify Cloudinary credentials
5. Check SMTP settings for email functionality

#### Prisma Issues
```bash
# Regenerate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# View Prisma Studio
npx prisma studio
```

## Production Build Information

### Output Structure
```
.next/
├── server/          # Server-side code and API routes
├── static/          # Pre-rendered static pages and assets
├── cache/           # Build cache
└── ...build files
```

### File Sizes
- Main Bundle: ~87.3 KB (shared)
- Admin Pages: ~225 KB (with dependencies)
- Public Pages: ~110-145 KB each
- API Routes: 0 B (server-rendered)

### Build Artifacts
- **Middleware**: 49.7 KB (authentication middleware)
- **Pages**: 32 total (12 dynamic, 20 static)
- **API Routes**: 14 total
- **Static Assets**: CSS, JS, images optimized

## Next Steps

1. **Set up PostgreSQL database** - Configure postgres instance and note connection string
2. **Configure Cloudinary account** - Get cloud name, API key, and secret
3. **Set up SMTP** - Configure email provider (Gmail, SendGrid, etc.)
4. **Deploy to hosting** - Use Vercel, self-hosted, or Docker
5. **Configure environment variables** - Add secrets to your hosting platform
6. **Run database migrations** - Execute `npx prisma db push`
7. **Test all functionality** - Verify login, forms, uploads work
8. **Set up monitoring** - Enable error tracking and analytics
9. **Configure backups** - Set up automated database backups
10. **Monitor performance** - Track Web Vitals and user experience

## Support Documentation

- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **NextAuth.js Docs**: https://next-auth.js.org
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Cloudinary**: https://cloudinary.com/documentation

---

**Build Date**: $(date)
**Application**: Kowa Namu Ne Foundation
**Framework**: Next.js 14.2.5
**Status**: ✅ Production Ready

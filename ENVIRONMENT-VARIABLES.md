# 🔐 ENVIRONMENT VARIABLES FOR VERCEL DEPLOYMENT

## 📋 **COPY THESE EXACT VALUES TO VERCEL DASHBOARD**

### **For Web App (jaladri-news-company-website):**

```
DATABASE_URL
postgresql://postgres.tdhmkccvahnxlrzyswpc:Jaladri202513090312345_@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres

DIRECT_URL
postgresql://postgres.tdhmkccvahnxlrzyswpc:Jaladri202513090312345_@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres

NEXTAUTH_SECRET
jaladri-super-secret-key-2025-production-ready-minimum-32-chars-for-security

NEXTAUTH_URL
https://jaladri-news-company-website.vercel.app

NODE_ENV
production
```

### **For CMS App (when creating second project):**

```
DATABASE_URL
postgresql://postgres.tdhmkccvahnxlrzyswpc:Jaladri202513090312345_@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres

DIRECT_URL
postgresql://postgres.tdhmkccvahnxlrzyswpc:Jaladri202513090312345_@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres

NEXTAUTH_SECRET
jaladri-super-secret-key-2025-production-ready-minimum-32-chars-for-security

NEXTAUTH_URL
https://jaladri-news-cms.vercel.app

NODE_ENV
production
```

## 🚀 **DEPLOYMENT STEPS:**

1. **Complete current Vercel CLI setup** with these answers:
   - Directory: `./`
   - Modify settings: `Yes`
   - Build Command: `cd ../.. && pnpm prisma:generate && pnpm build:web`
   - Install Command: `cd ../.. && pnpm install --frozen-lockfile`

2. **Add Environment Variables** in Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add each variable above

3. **Redeploy** after adding environment variables

## 🔧 **BUILD COMMANDS:**

**Web App:**
```bash
cd ../.. && pnpm prisma:generate && pnpm build:web
```

**CMS App:**
```bash
cd ../.. && pnpm prisma:generate && pnpm build:cms
```

**Install Command:**
```bash
cd ../.. && pnpm install --frozen-lockfile
```
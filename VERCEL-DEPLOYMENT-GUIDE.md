# 🚀 VERCEL DEPLOYMENT GUIDE - Jaladri News

## 📋 **PRE-DEPLOYMENT CHECKLIST**
- ✅ All critical files pushed to GitHub
- ✅ Database connection tested and working
- ✅ Environment variables prepared
- ✅ Build commands configured
- ✅ Monorepo structure properly set up

## 🌐 **STEP 1: DEPLOY WEB APP (Main Website)**

### **1.1 Create New Project**
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"New Project"**
4. Import: `Wsnusptr/Jaladri-news-website`

### **1.2 Configure Web App Settings**
```
Project Name: jaladri-news-web
Framework: Next.js
Root Directory: ./
Build Command: pnpm prisma:generate && pnpm build:web
Output Directory: apps/web/.next
Install Command: pnpm install --frozen-lockfile
Node.js Version: 18.x
```

### **1.3 Environment Variables (Web App)**
```
DATABASE_URL = postgresql://postgres.tdhmkccvahnxlrzyswpc:Jaladri202513090312345_@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres

DIRECT_URL = postgresql://postgres.tdhmkccvahnxlrzyswpc:Jaladri202513090312345_@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres

NEXTAUTH_SECRET = jaladri-super-secret-key-2025-production-ready-minimum-32-chars

NEXTAUTH_URL = https://your-web-domain.vercel.app

NODE_ENV = production
```

## 🔧 **STEP 2: DEPLOY CMS APP (Admin Panel)**

### **2.1 Create Second Project**
1. Click **"New Project"** again
2. Import same repository: `Wsnusptr/Jaladri-news-website`

### **2.2 Configure CMS Settings**
```
Project Name: jaladri-news-cms
Framework: Next.js
Root Directory: ./
Build Command: pnpm prisma:generate && pnpm build:cms
Output Directory: apps/cms/.next
Install Command: pnpm install --frozen-lockfile
Node.js Version: 18.x
```

### **2.3 Environment Variables (CMS App)**
```
DATABASE_URL = postgresql://postgres.tdhmkccvahnxlrzyswpc:Jaladri202513090312345_@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres

DIRECT_URL = postgresql://postgres.tdhmkccvahnxlrzyswpc:Jaladri202513090312345_@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres

NEXTAUTH_SECRET = jaladri-super-secret-key-2025-production-ready-minimum-32-chars

NEXTAUTH_URL = https://your-cms-domain.vercel.app

NODE_ENV = production
```

## ⚙️ **STEP 3: ADVANCED CONFIGURATION**

### **3.1 Function Configuration**
Both projects will automatically configure:
- API routes with 30s timeout
- Node.js 18.x runtime
- Automatic Prisma generation

### **3.2 Domain Configuration**
After deployment:
1. **Web App**: `https://jaladri-news-web.vercel.app`
2. **CMS App**: `https://jaladri-news-cms.vercel.app`

Update NEXTAUTH_URL in environment variables with actual domains.

## 🔍 **STEP 4: VERIFY DEPLOYMENT**

### **4.1 Check Build Logs**
- Ensure Prisma generation succeeds
- Verify all dependencies install correctly
- Check for TypeScript compilation errors

### **4.2 Test Functionality**
- **Web App**: Homepage loads, articles display
- **CMS App**: Login works, admin panel accessible
- **Database**: Connection established, queries work

### **4.3 Test Authentication**
- User registration/login
- Protected routes work
- Session management functional

## 🚨 **TROUBLESHOOTING**

### **Common Issues & Solutions:**

**1. Prisma Generation Failed**
```bash
# Solution: Ensure DATABASE_URL is set in build environment
Build Command: DATABASE_URL=$DATABASE_URL pnpm prisma:generate && pnpm build:web
```

**2. Module Resolution Error**
```bash
# Solution: Use frozen lockfile
Install Command: pnpm install --frozen-lockfile
```

**3. Authentication Not Working**
- Check NEXTAUTH_URL matches actual domain
- Verify NEXTAUTH_SECRET is set
- Ensure database connection is working

**4. Build Timeout**
- Increase function timeout in vercel.json
- Optimize build process
- Check for infinite loops in build

## 📊 **DEPLOYMENT CHECKLIST**

### **Pre-Deploy:**
- [ ] Repository pushed to GitHub
- [ ] Environment variables prepared
- [ ] Database accessible
- [ ] Build commands tested locally

### **During Deploy:**
- [ ] Web app project created
- [ ] CMS app project created
- [ ] Environment variables set
- [ ] Build logs checked

### **Post-Deploy:**
- [ ] Both apps accessible
- [ ] Database connection working
- [ ] Authentication functional
- [ ] All features tested

## 🎯 **EXPECTED RESULTS**

After successful deployment:
- **Web App**: Public news website at `https://jaladri-news-web.vercel.app`
- **CMS App**: Admin panel at `https://jaladri-news-cms.vercel.app`
- **Database**: Fully functional with all tables and data
- **Authentication**: Working login/logout system
- **Features**: All functionality operational

## 📞 **SUPPORT**

If deployment fails:
1. Check build logs in Vercel dashboard
2. Verify environment variables
3. Test database connection
4. Review error messages
5. Check GitHub repository for missing files

**Database Password**: `Jaladri202513090312345_`
**Repository**: `https://github.com/Wsnusptr/Jaladri-news-website`
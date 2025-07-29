# Jaladri News Project

## Deployment Steps

1. **Environment Setup**
   - Set up environment variables in Vercel dashboard
   - Configure Supabase database connection
   - Set up domain and SSL certificates

2. **Database Configuration**
   - Database URL: postgresql://postgres:[password]@db.tdhmkccvahnxlrzyswpc.supabase.co:5432/postgres
   - Ensure all migrations are applied
   - Verify database connections

3. **Vercel Deployment**
   - Push code to GitHub
   - Connect repository to Vercel
   - Configure build settings
   - Set environment variables
   - Deploy application

4. **Domain Setup**
   - Configure custom domain in Vercel
   - Update DNS settings in RumahWeb
   - Set up SSL certificates
   - Verify domain connection

5. **Google Console Setup**
   - Register domain in Google Search Console
   - Submit sitemap
   - Verify ownership
   - Configure SEO settings

## Build Commands# information
All news that is published and violates the rules and is a hoax or other news is not a mix of developers and developers are not responsible for that.

# 📰 Modern News Website

A professional news website built with Next.js, featuring smooth animations, dark/light mode, and a responsive design inspired by premium news portals.

## ✨ Features

- 🌓 **Perfect Dark/Light Mode** - Smooth transitions between themes
- 🔄 **Animated Background** - Interactive particle system
- 📱 **Fully Responsive** - Optimized for all device sizes
- 🎭 **Modern UI Components** - Professional news layout with multiple sections
- 📊 **Interactive News Elements** - Carousels, sliders, and dynamic content
- 🚀 **Performance Optimized** - Fast loading and minimal layout shifts

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **Animations**: Framer Motion + Custom CSS animations
- **Theme System**: next-themes with enhanced implementation
- **Icons**: Lucide React
- **State Management**: React Context API
- **Database**: Prisma with PostgreSQL

## 📂 Project Structure

```
news-website-project/
├── apps/
│   ├── cms/               # Admin CMS for content management
│   └── web/               # Main news website frontend
│       ├── app/           # Next.js App Router
│       ├── components/    # Reusable UI components
│       │   ├── ads/       # Advertisement components
│       │   ├── articles/  # Article display components
│       │   ├── layout/    # Layout components
│       │   ├── sections/  # Major page sections
│       │   ├── shared/    # Shared utility components
│       │   └── widgets/   # Reusable content widgets
│       ├── hooks/         # Custom React hooks
│       ├── public/        # Static assets
│       └── styles/        # Global styles and animations
└── packages/
    ├── db/                # Database schema and access
    └── ui/                # Shared UI component library
```

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/your-username/news-website-project.git
cd news-website-project
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up the database**

```bash
docker-compose up -d
pnpm db:setup
```

4. **Start the development server**

```bash
pnpm dev
```

5. **Open your browser**
   - Web application: [http://localhost:3000](http://localhost:3000)
   - CMS: [http://localhost:3001](http://localhost:3001)

## 🎨 Design System

The project uses a comprehensive design system with CSS variables to ensure consistency across the application:

- Color scheme with light/dark mode support
- Typography hierarchy
- Spacing and layout guidelines
- Animation timing and easing
- Component variants

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 768px
- **Desktop**: 1024px
- **Large Desktop**: 1280px

## 🔐 Authentication

- User registration and login
- Social authentication options
- Protected routes for subscribers
- Admin-only CMS access

## 🔮 Future Plans

- Enhanced personalization features
- Comment system with moderation
- Real-time notifications
- Advanced search functionality
- Performance analytics dashboard

## 📄 License

MIT

// apps/web/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/db', 'ui'],

  // Fix for Windows generateBuildId crypto issue
  generateBuildId: async () => {
    if (process.env.NODE_ENV === 'production') {
      const crypto = require('crypto');
      return crypto.randomBytes(16).toString('hex');
    }
    // Use timestamp for development builds
    return Date.now().toString();
  },

  // Konfigurasi CORS untuk API routes
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          // Allow access from CMS in production and localhost in development
          { key: "Access-Control-Allow-Origin", value: process.env.NODE_ENV === 'production' ? "https://jaladri-cms.vercel.app" : "http://localhost:3001" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" },
        ]
      }
    ]
  },

  images: {
    // TODO: Set to false in production for performance benefits after fixing problematic URLs.
    unoptimized: process.env.NODE_ENV === 'development',
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      // TODO: Replace with your actual image storage domains for production.
      // e.g., { protocol: 'https', hostname: 'your-s3-bucket.s3.amazonaws.com' }
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'logo.clearbit.com' },
      { protocol: 'https', hostname: '**.detik.com' },
      { protocol: 'https', hostname: 'img.icons8.com' },
      { protocol: 'https', hostname: 'akcdn.detik.net.id' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  outputFileTracingIncludes: {
    '/api/**/*': ['./packages/db/**/*'],
  },
};

module.exports = nextConfig;

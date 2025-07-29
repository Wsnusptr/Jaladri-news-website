// apps/cms/next.config.js
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

  // Menggunakan port yang berbeda untuk CMS
  serverRuntimeConfig: {
    port: 3001
  },

  // Konfigurasi CORS untuk API routes
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" },
        ]
      }
    ]
  },

  images: {
    unoptimized: true, // Skip optimization for problematic URLs
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
  },
};

module.exports = nextConfig;
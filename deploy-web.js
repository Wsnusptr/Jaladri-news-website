#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting Jaladri News Web Deployment...');

try {
    // Change to web directory
    process.chdir(path.join(__dirname, 'apps', 'web'));

    console.log('📦 Installing dependencies...');
    execSync('cd ../.. && pnpm install --frozen-lockfile', { stdio: 'inherit' });

    console.log('🔧 Generating Prisma client...');
    execSync('cd ../.. && pnpm prisma:generate', { stdio: 'inherit' });

    console.log('🏗️ Building web application...');
    execSync('cd ../.. && pnpm build:web', { stdio: 'inherit' });

    console.log('🌐 Deploying to Vercel...');
    execSync('vercel --prod --yes', { stdio: 'inherit' });

    console.log('✅ Deployment completed successfully!');
} catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
}
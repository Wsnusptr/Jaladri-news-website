#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Preparing Vercel deployment...');

// Backup original package.json
const webDir = path.join(__dirname, 'apps', 'web');
const originalPackage = path.join(webDir, 'package.json');
const backupPackage = path.join(webDir, 'package.json.backup');
const vercelPackage = path.join(webDir, 'package-vercel.json');

try {
    // Backup original
    fs.copyFileSync(originalPackage, backupPackage);
    console.log('✅ Backed up original package.json');

    // Replace with Vercel-compatible version
    fs.copyFileSync(vercelPackage, originalPackage);
    console.log('✅ Replaced with Vercel-compatible package.json');

    console.log('🚀 Ready for deployment! Run: vercel --prod');

} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}
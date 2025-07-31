# Deploy script untuk CMS
Write-Host "Starting CMS deployment..." -ForegroundColor Green

# Set environment variables untuk Vercel
Write-Host "Setting up environment variables..." -ForegroundColor Yellow

vercel env add DATABASE_URL production
vercel env add DIRECT_URL production  
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production
vercel env add NEXT_PUBLIC_BASE_URL production
vercel env add WEB_APP_URL production

Write-Host "Environment variables set. Now deploying..." -ForegroundColor Yellow

# Deploy to Vercel
vercel --prod

Write-Host "Deployment completed!" -ForegroundColor Green
Write-Host "Don't forget to run database migrations if needed." -ForegroundColor Cyan
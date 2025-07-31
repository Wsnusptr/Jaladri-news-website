const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

// Set environment variables
process.env.DATABASE_URL = "postgresql://postgres.tdhmkccvahnxlrzyswpc:Jaladri202513090312345_@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres";
process.env.DIRECT_URL = "postgresql://postgres.tdhmkccvahnxlrzyswpc:Jaladri202513090312345_@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres";

const prisma = new PrismaClient();

async function createAdminAndSampleData() {
    try {
        console.log('🔄 Creating admin user and sample data...');

        // Create admin user
        const hashedPassword = await bcrypt.hash('admin123', 12);

        const adminUser = await prisma.user.upsert({
            where: { email: 'admin@jaladri.com' },
            update: {
                role: 'ADMIN',
                password: hashedPassword,
            },
            create: {
                email: 'admin@jaladri.com',
                name: 'Admin Jaladri',
                password: hashedPassword,
                role: 'ADMIN',
            },
        });

        console.log('✅ Admin user created:', adminUser.email);

        // Create categories
        const categories = [
            { name: 'Berita Utama', slug: 'berita-utama' },
            { name: 'Politik', slug: 'politik' },
            { name: 'Ekonomi', slug: 'ekonomi' },
            { name: 'Olahraga', slug: 'olahraga' },
            { name: 'Teknologi', slug: 'teknologi' },
            { name: 'Hiburan', slug: 'hiburan' },
            { name: 'Lifestyle', slug: 'lifestyle' },
            { name: 'Kesehatan', slug: 'kesehatan' },
            { name: 'Pendidikan', slug: 'pendidikan' },
            { name: 'Internasional', slug: 'internasional' },
        ];

        for (const category of categories) {
            await prisma.category.upsert({
                where: { slug: category.slug },
                update: {},
                create: category,
            });
        }

        console.log('✅ Categories created');

        // Create sample articles
        const sampleArticles = [
            {
                title: 'Perkembangan Teknologi AI di Indonesia Tahun 2024',
                content: 'Teknologi Artificial Intelligence (AI) mengalami perkembangan pesat di Indonesia. Berbagai startup dan perusahaan teknologi mulai mengadopsi AI untuk meningkatkan efisiensi bisnis mereka. Pemerintah juga mendukung pengembangan AI melalui berbagai program dan inisiatif.',
                imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
                type: 'STANDARD',
                status: 'PUBLISHED',
                categorySlug: 'teknologi',
                isHotNews: true,
            },
            {
                title: 'Ekonomi Digital Indonesia Tumbuh Signifikan',
                content: 'Sektor ekonomi digital Indonesia menunjukkan pertumbuhan yang sangat signifikan di tahun 2024. E-commerce, fintech, dan layanan digital lainnya menjadi motor penggerak ekonomi nasional.',
                imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
                type: 'STANDARD',
                status: 'PUBLISHED',
                categorySlug: 'ekonomi',
                isSlider: true,
            },
            {
                title: 'Gaya Hidup Sehat di Era Modern',
                content: 'Tren gaya hidup sehat semakin populer di kalangan masyarakat Indonesia. Olahraga rutin, pola makan sehat, dan mindfulness menjadi bagian penting dalam kehidupan sehari-hari.',
                imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
                type: 'LIFESTYLE',
                status: 'PUBLISHED',
                categorySlug: 'lifestyle',
                isRecommendation: true,
            },
            {
                title: 'Video: Tutorial Memasak Rendang Tradisional',
                content: 'Pelajari cara memasak rendang tradisional Padang dengan resep turun temurun. Video tutorial lengkap dengan tips dan trik dari chef berpengalaman.',
                imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop',
                type: 'VIDEO',
                status: 'PUBLISHED',
                categorySlug: 'lifestyle',
            },
            {
                title: 'Jaladri Network: Inovasi Terbaru dalam Dunia Media',
                content: 'Jaladri Network menghadirkan inovasi terbaru dalam dunia media digital. Platform ini menggabungkan teknologi AI dengan jurnalisme berkualitas untuk memberikan pengalaman berita yang lebih personal.',
                imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop',
                type: 'JALADRI_NETWORK',
                status: 'PUBLISHED',
                categorySlug: 'teknologi',
            },
        ];

        for (const articleData of sampleArticles) {
            const category = await prisma.category.findUnique({
                where: { slug: articleData.categorySlug }
            });

            if (category) {
                const slug = articleData.title
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, '')
                    .trim()
                    .replace(/\s+/g, '-');

                await prisma.article.upsert({
                    where: { slug },
                    update: {},
                    create: {
                        title: articleData.title,
                        content: articleData.content,
                        imageUrl: articleData.imageUrl,
                        type: articleData.type,
                        status: articleData.status,
                        slug,
                        authorId: adminUser.id,
                        publishedAt: new Date(),
                        isHotNews: articleData.isHotNews || false,
                        isSlider: articleData.isSlider || false,
                        isRecommendation: articleData.isRecommendation || false,
                        categories: {
                            connect: [{ id: category.id }]
                        }
                    }
                });
            }
        }

        console.log('✅ Sample articles created');

        // Create sample Live TV
        await prisma.liveTV.upsert({
            where: { id: 'sample-live-tv' },
            update: {},
            create: {
                id: 'sample-live-tv',
                title: 'Jaladri News Live',
                embedUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk',
                isActive: true,
                createdById: adminUser.id,
            }
        });

        console.log('✅ Sample Live TV created');

        console.log('\n🎉 Setup completed successfully!');
        console.log('\n📋 Admin credentials:');
        console.log('Email: admin@jaladri.com');
        console.log('Password: admin123');
        console.log('\n🌐 You can now:');
        console.log('1. Login to CMS with admin credentials');
        console.log('2. View sample articles on the website');
        console.log('3. Test all features');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createAdminAndSampleData();
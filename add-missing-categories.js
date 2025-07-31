// Script untuk menambahkan kategori yang hilang
const { PrismaClient } = require('./packages/db/node_modules/@prisma/client');

const prisma = new PrismaClient();

async function addMissingCategories() {
    try {
        console.log('Menambahkan kategori yang hilang...');

        const categories = [
            { name: 'Berita', slug: 'berita' },
            { name: 'Teknologi', slug: 'teknologi' },
            { name: 'Olahraga', slug: 'olahraga' },
            { name: 'Politik', slug: 'politik' },
            { name: 'Ekonomi', slug: 'ekonomi' },
            { name: 'Video', slug: 'video' },
            { name: 'Lifestyle', slug: 'lifestyle' },
            { name: 'JaladriNetwork', slug: 'jaladri-network' },
        ];

        for (const category of categories) {
            const existing = await prisma.category.findUnique({
                where: { slug: category.slug }
            });

            if (!existing) {
                await prisma.category.create({
                    data: category
                });
                console.log(`✅ Kategori "${category.name}" berhasil ditambahkan`);
            } else {
                console.log(`ℹ️  Kategori "${category.name}" sudah ada`);
            }
        }

        console.log('✅ Selesai menambahkan kategori');
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

addMissingCategories();
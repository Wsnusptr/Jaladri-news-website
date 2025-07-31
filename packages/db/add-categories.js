const { PrismaClient } = require('@prisma/client');

async function addCategories() {
    const prisma = new PrismaClient();

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

        // Gunakan upsert untuk menghindari konflik
        for (const category of categories) {
            try {
                const result = await prisma.category.upsert({
                    where: { slug: category.slug },
                    update: {},
                    create: category
                });
                console.log(`✅ Kategori "${category.name}" berhasil ditambahkan/diperbarui`);
            } catch (err) {
                console.log(`⚠️  Kategori "${category.name}" mungkin sudah ada`);
            }
        }

        console.log('✅ Selesai menambahkan kategori');
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

addCategories();
-- Create admin user manually
INSERT INTO users (id, email, name, password, role, "createdAt", "updatedAt")
VALUES (
  'admin-user-id-123',
  'admin@jaladri.com',
  'Admin Jaladri',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBdXig/goZ4Whq', -- admin123
  'ADMIN',
  NOW(),
  NOW()
) ON CONFLICT (email) DO UPDATE SET
  role = 'ADMIN',
  password = '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBdXig/goZ4Whq',
  "updatedAt" = NOW();

-- Create categories
INSERT INTO categories (id, name, slug) VALUES
  ('cat-berita-utama', 'Berita Utama', 'berita-utama'),
  ('cat-politik', 'Politik', 'politik'),
  ('cat-ekonomi', 'Ekonomi', 'ekonomi'),
  ('cat-olahraga', 'Olahraga', 'olahraga'),
  ('cat-teknologi', 'Teknologi', 'teknologi'),
  ('cat-hiburan', 'Hiburan', 'hiburan'),
  ('cat-lifestyle', 'Lifestyle', 'lifestyle'),
  ('cat-kesehatan', 'Kesehatan', 'kesehatan'),
  ('cat-pendidikan', 'Pendidikan', 'pendidikan'),
  ('cat-internasional', 'Internasional', 'internasional')
ON CONFLICT (slug) DO NOTHING;

-- Create sample articles
INSERT INTO articles (id, title, slug, content, "imageUrl", type, status, "authorId", "publishedAt", "isHotNews", "isSlider", "isRecommendation", "createdAt", "updatedAt") VALUES
  (
    'article-ai-indonesia',
    'Perkembangan Teknologi AI di Indonesia Tahun 2024',
    'perkembangan-teknologi-ai-di-indonesia-tahun-2024',
    'Teknologi Artificial Intelligence (AI) mengalami perkembangan pesat di Indonesia. Berbagai startup dan perusahaan teknologi mulai mengadopsi AI untuk meningkatkan efisiensi bisnis mereka. Pemerintah juga mendukung pengembangan AI melalui berbagai program dan inisiatif.',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    'STANDARD',
    'PUBLISHED',
    'admin-user-id-123',
    NOW(),
    true,
    false,
    false,
    NOW(),
    NOW()
  ),
  (
    'article-ekonomi-digital',
    'Ekonomi Digital Indonesia Tumbuh Signifikan',
    'ekonomi-digital-indonesia-tumbuh-signifikan',
    'Sektor ekonomi digital Indonesia menunjukkan pertumbuhan yang sangat signifikan di tahun 2024. E-commerce, fintech, dan layanan digital lainnya menjadi motor penggerak ekonomi nasional.',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    'STANDARD',
    'PUBLISHED',
    'admin-user-id-123',
    NOW(),
    false,
    true,
    false,
    NOW(),
    NOW()
  ),
  (
    'article-gaya-hidup-sehat',
    'Gaya Hidup Sehat di Era Modern',
    'gaya-hidup-sehat-di-era-modern',
    'Tren gaya hidup sehat semakin populer di kalangan masyarakat Indonesia. Olahraga rutin, pola makan sehat, dan mindfulness menjadi bagian penting dalam kehidupan sehari-hari.',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    'LIFESTYLE',
    'PUBLISHED',
    'admin-user-id-123',
    NOW(),
    false,
    false,
    true,
    NOW(),
    NOW()
  ),
  (
    'article-video-rendang',
    'Video: Tutorial Memasak Rendang Tradisional',
    'video-tutorial-memasak-rendang-tradisional',
    'Pelajari cara memasak rendang tradisional Padang dengan resep turun temurun. Video tutorial lengkap dengan tips dan trik dari chef berpengalaman.',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop',
    'VIDEO',
    'PUBLISHED',
    'admin-user-id-123',
    NOW(),
    false,
    false,
    false,
    NOW(),
    NOW()
  ),
  (
    'article-jaladri-network',
    'Jaladri Network: Inovasi Terbaru dalam Dunia Media',
    'jaladri-network-inovasi-terbaru-dalam-dunia-media',
    'Jaladri Network menghadirkan inovasi terbaru dalam dunia media digital. Platform ini menggabungkan teknologi AI dengan jurnalisme berkualitas untuk memberikan pengalaman berita yang lebih personal.',
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop',
    'JALADRI_NETWORK',
    'PUBLISHED',
    'admin-user-id-123',
    NOW(),
    false,
    false,
    false,
    NOW(),
    NOW()
  )
ON CONFLICT (slug) DO NOTHING;

-- Connect articles to categories
INSERT INTO "_ArticleToCategory" ("A", "B") VALUES
  ('article-ai-indonesia', 'cat-teknologi'),
  ('article-ekonomi-digital', 'cat-ekonomi'),
  ('article-gaya-hidup-sehat', 'cat-lifestyle'),
  ('article-video-rendang', 'cat-lifestyle'),
  ('article-jaladri-network', 'cat-teknologi')
ON CONFLICT DO NOTHING;
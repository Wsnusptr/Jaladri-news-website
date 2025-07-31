// apps/web/lib/footer-data.ts



export const socialLinks = [
  { iconName: 'MessageCircle', href: '#', label: 'Whatsapp' },
  { iconName: 'Facebook', href: '#', label: 'Facebook' },
  { iconName: 'Twitter', href: '#', label: 'Twitter' },
  { iconName: 'Instagram', href: '#', label: 'Instagram' },
  { iconName: 'Linkedin', href: '#', label: 'LinkedIn' },
  { iconName: 'Youtube', href: '#', label: 'YouTube' },
  { iconName: 'Tiktok', href: '#', label: 'TikTok' },
];

export const footerLinkColumns = {
  kategori: [
    // PERBAIKAN: Menyesuaikan href dengan slug dari database
    { label: 'Politik', href: '/category/politik' },
    { label: 'Ekonomi', href: '/category/ekonomi' },
    { label: 'Teknologi', href: '/category/teknologi' },
    { label: 'Olahraga', href: '/category/olahraga' },
    { label: 'Video', href: '/category/video' },
  ],
  layanan: [
    { label: 'Berlangganan', href: '/subscribe' },
    { label: 'Iklan', href: '/advertise' },
    { label: 'Karir', href: '/careers' },
  ],
  informasi: [
    { label: 'Tentang Kami', href: '/about' },
    { label: 'Kontak', href: '/contact' },
    { label: 'Redaksi', href: '/editorial' },
  ],
  jaringanMedia: [
    // PERBAIKAN: Mengganti nama sesuai permintaan
    { label: 'Jaladri Network', href: '#' },
    { label: 'Jaladri Media', href: '#' },
  ]
};
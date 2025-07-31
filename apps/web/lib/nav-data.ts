// apps/web/lib/nav-data.ts

import {
  Flame, Newspaper, Tv, Gamepad2, Car, UtensilsCrossed, Briefcase, HeartPulse,
  ShoppingBag, Camera, GraduationCap, Building2, Drama, Anchor,
  Landmark, Plane, Home, Users, Clapperboard, Award, Handshake, Link,
  LogIn, UserPlus,
  Cpu
} from 'lucide-react';

// Anda bisa mengganti 'any' dengan tipe ikon yang lebih spesifik jika perlu
export interface NavLink {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  isNew?: boolean;
}

export const mainLinks: NavLink[] = [
  { label: 'Jaladricom', href: '/', icon: Home },
  { label: 'Terpopuler', href: '/terpopuler', icon: Flame },
  { label: 'Live TV', href: '/live-tv', icon: Tv },
  { label: 'Kirim Tulisan', href: '/kirim-tulisan', icon: Newspaper },
];

export const authLinks: NavLink[] = [
  { label: 'Masuk', href: '/login', icon: LogIn },
  { label: 'Daftar MPC', href: '/register', icon: UserPlus },
];

// Kategori berita disinkronkan dengan slug dari database
// URL diarahkan ke /category/[slug]
export const newsCategories: NavLink[] = [
  { label: 'Berita', href: '/category/berita', icon: Newspaper },
  { label: 'Teknologi', href: '/category/teknologi', icon: Cpu }, // Mengganti ikon
  { label: 'Olahraga', href: '/category/olahraga', icon: Gamepad2 },
  { label: 'Politik', href: '/category/politik', icon: Landmark },
  { label: 'Ekonomi', href: '/category/ekonomi', icon: Briefcase },
  { label: 'Video', href: '/category/video', icon: Clapperboard },
  // Tambahkan kategori lain seperti Lifestyle jika sudah ada di DB
];

export const regionalNews: NavLink[] = [
  { label: 'JaladriJateng', href: '/jateng', icon: Landmark },
  { label: 'JaladriJatim', href: '/jatim', icon: Landmark },
  { label: 'JaladriJabar', href: '/jabar', icon: Landmark },
  { label: 'JaladriSulsel', href: '/sulsel', icon: Landmark },
  { label: 'JaladriSumut', href: '/sumut', icon: Landmark },
  { label: 'JaladriBali', href: '/bali', icon: Landmark },
  { label: 'JaladriSumbagsel', href: '/sumbagsel', icon: Landmark },
  { label: 'JaladriJogja', href: '/jogja', icon: Landmark },
  { label: 'JaladriKalimantan', href: '/kalimantan', icon: Landmark, isNew: true },
];

export const services: NavLink[] = [
  { label: 'For Your Business', href: '/bisnis', icon: Briefcase, isNew: true },
  // ... Tambahkan layanan lainnya di sini
];

export const network: NavLink[] = [
  { label: 'JaladriNetwork', href: '/category/jaladri-network', icon: Users },
  // ... Tambahkan jaringan lainnya di sini
];

export const tertiaryNavLinks = [
  { label: 'Adsmart', href: '#', hasIndicator: false },
  { label: 'JaladriX', href: '#', hasIndicator: false },
  { label: 'Sepakbola', href: '#', hasIndicator: false },
  { label: 'Hikmah', href: '#', hasIndicator: false },
  { label: 'Edu', href: '#', hasIndicator: false },
  { label: 'Properti', href: '#', hasIndicator: false },
  { label: 'Pop', href: '#', hasIndicator: false },
  { label: 'JaladriJateng-Jogja Awards 2025', href: '#', hasIndicator: true },
  { label: 'FYB', href: '#', hasIndicator: false },
  { label: 'Hoegeng Awards', href: '#', hasIndicator: false },
  { label: 'Adhyaksa Awards', href: '#', hasIndicator: true },
];
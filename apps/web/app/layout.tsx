import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// --- Semua import Anda sudah benar ---
import { Providers } from '@/app/providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ClientPopupWrapper } from '@/components/shared/ClientPopupWrapper';
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';
import { CategoryNav } from '@/components/navigation/CategoryNav';
import '@/styles/globals.css';
import '@/styles/animations.css';
// --- Tambahkan import untuk SessionProvider ---
import SessionProvider from '@/components/auth/SessionProvider';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jaladri News - Portal Berita Modern',
  description: 'Portal berita terkini yang dibangun dengan Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) { 
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Script Anda untuk tema sudah bagus */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen font-edge bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-all duration-300 ease-edge antialiased">
        <Providers>
          {/* Bungkus semua komponen dengan SessionProvider */}
          <SessionProvider>
            <AnimatedBackground intensity="medium" enableInteraction={true} />
            <div className="relative z-10 min-h-screen flex flex-col">
              <Header />
              <CategoryNav variant="horizontal" />
              <main className="flex-1 relative">
                <div className="min-h-screen">
                  {children}
                </div>
              </main>
              <ClientPopupWrapper />
              <Footer />
            </div>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
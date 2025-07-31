import "./globals.css";
import { SessionProvider } from 'next-auth/react';
import ClientLayout from './client-layout';

// Main RootLayout component (Server Component)
export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="id">
      <body className="bg-gray-100 text-gray-900">
        <SessionProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </SessionProvider>
      </body>
    </html>
  );
}
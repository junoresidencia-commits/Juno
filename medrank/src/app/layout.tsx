import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { TestModeBanner } from '@/components/TestModeBanner';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MedRank — Disputa do dia',
  description: 'Faça a disputa diária e acompanhe o ranking',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MedRank',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} style={{ colorScheme: 'light' }}>
      <body className="min-h-full flex flex-col">
        <TestModeBanner />
        {children}
      </body>
    </html>
  );
}

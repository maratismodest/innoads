import Footer from '@/components/Footer';
import Header from '@/components/Header/Header';
import AuthProvider from '@/context/AuthContext';
import FavouriteProvider from '@/context/FavouritesContext';
import ModalProvider from '@/context/ModalContext';
import ToastProvider from '@/context/ToastContext';
import { seo } from '@/utils/constants';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import React from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: seo.default.title,
  description: seo.default.description,
  authors: [{ name: 'InnoAds' }],
  publisher: 'InnoAds',
  keywords: 'innoads, Иннополис, доска объявлений',
  manifest: '/manifest.json',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <AuthProvider>
          <ModalProvider>
            <ToastProvider>
              <FavouriteProvider>
                <Header />
                <main>{children}</main>
                <Footer />
              </FavouriteProvider>
            </ToastProvider>
          </ModalProvider>
        </AuthProvider>
        <Script src="/scripts/ym.js" strategy="afterInteractive" />
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

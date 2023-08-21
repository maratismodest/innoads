import {languages} from '../i18n/settings'
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import AuthProvider from '@/context/AuthContext';
import FavouriteProvider from '@/context/FavouritesContext';
import ModalProvider from '@/context/ModalContext';
import {seo} from '@/utils/constants';
import {dir} from 'i18next'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import React from 'react';

export async function generateStaticParams() {
  return languages.map((lng) => ({lng}))
}

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: seo.default.title,
  description: seo.default.description,
  authors: [{name: 'InnoAds'}],
  keywords: 'innoads, Иннополис, доска объявлений',
}


export default function RootLayout({
                                     children,
                                     params: {
                                       lng
                                     },
                                   }: {
  children: React.ReactNode,
  params: {
    lng: string
  },
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
    <body className={inter.className}>
    <AuthProvider>
      <ModalProvider>
        <FavouriteProvider>
          <Header/>
          <main>{children}</main>
          <Footer/>
        </FavouriteProvider>
      </ModalProvider>
    </AuthProvider>
    </body>
    </html>
  )
}

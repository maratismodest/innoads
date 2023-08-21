import Footer from '@/components/Footer';
import Header from '@/components/Header';
import AuthProvider from '@/context/AuthContext';
import FavouriteProvider from '@/context/FavouritesContext';
import ModalProvider from '@/context/ModalContext';
import {seo} from '@/utils/constants';
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import React from 'react';
import './globals.css'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: seo.default.title,
  description: seo.default.description,
  authors: [{name: 'InnoAds'}],
  keywords: 'innoads, Иннополис, доска объявлений',
}

export default function RootLayout({
                                     children
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang='ru'>
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

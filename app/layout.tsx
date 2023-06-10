import './globals.css'
import Index from "@/components/Header";
import AuthProvider from "@/context/AuthContext";
import FavouriteProvider from "@/context/FavouritesContext";
import ModalProvider from "@/context/ModalContext";
import {seo} from "@/utils/constants";
import {Metadata} from "next";
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: {
    default: seo.default.title,
    template: '%s'
  },
  description: seo.default.description,
}

export default async function RootLayout({
                                           children
                                         }: {
  children: React.ReactNode, params?: any
}) {
  return (
    <html lang='ru'>
    <body className={inter.className}>
    <AuthProvider>
      <FavouriteProvider>
        <ModalProvider>
          <Index/>
          <main>{children}</main>
        </ModalProvider>
      </FavouriteProvider>
    </AuthProvider>
    </body>
    </html>
  )
}


// <meta charSet='utf-8'/>
// <meta name='robots'/>
// <link rel='icon' href='/favicon.ico'/>
// <link rel='manifest' href='/manifest.json'/>
// <meta property='og:type' content='website'/>
// <meta name='publisher' content='InnoAds'/>

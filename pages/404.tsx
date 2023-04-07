import Layout from '@/components/Layout'
import Button from '@/components/ui/Button'
import {Seo} from "@/types";
import {seo} from '@/utils/constants'
import revalidate from '@/utils/revalidate'
import {Routes} from '@/utils/routes'
import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import {GetStaticProps, NextPage} from 'next/types'
import React from 'react'

interface ErrorPageProps {
  seo: Seo
}

const ErrorPage: NextPage<ErrorPageProps> = ({seo}) => {
  const {t} = useTranslation()
  return (
    <Layout {...seo} className='flex'>
      <div className='flex w-full flex-col items-center justify-center'>
        <h1>{t('pageNotFound')}</h1>
        <Link href={Routes.main}>
          <Button>{t('onMain')}</Button>
        </Link>
      </div>
    </Layout>
  )
}

export default ErrorPage

export const getStaticProps: GetStaticProps = async ({locale}) => {
  return {
    props: {
      seo: seo.notFound,
      ...(await serverSideTranslations(locale as string)),
    },
    revalidate: revalidate,
  }
}

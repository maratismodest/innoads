import Layout from '@/components/Layout'
import Button from '@/components/ui/Button'
import type {Seo} from "@/types";
import {seo, routes} from '@/utils/constants'
import revalidate from '@/utils/revalidate'
import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import type {GetStaticProps} from 'next/types'
import React from 'react'

type Props = {
  seo: Seo
}

export default function ErrorPage({seo}: Props) {
  const {t} = useTranslation()
  return (
    <Layout {...seo} className='flex'>
      <div className='flex w-full flex-col items-center justify-center'>
        <h1>{t('pageNotFound')}</h1>
        <Link href={routes.main}>
          <Button>{t('onMain')}</Button>
        </Link>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({locale}) => {
  return {
    props: {
      seo: seo.notFound,
      ...(await serverSideTranslations(locale as string)),
    },
    revalidate: revalidate,
  }
}

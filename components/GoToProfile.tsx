import buttonStyles from "@/styles/buttonStyles";
import {Routes} from '@/utils/routes'
import {useTranslation} from 'next-i18next'
import Link from 'next/link'
import React from 'react'

const GoToProfile = (): JSX.Element => {
  const {t} = useTranslation()
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <h1>{t('notAuthorized')}</h1>
      <Link href={Routes.profile} className={buttonStyles()}>
        {t('goToAuth')}
      </Link>
    </div>
  )
}

export default GoToProfile

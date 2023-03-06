import Link from 'next/link'
import {useTranslation} from 'next-i18next'
import React from 'react'
import {Routes} from '@/utils/routes'

import Button from '@/components/ui/Button'

const GoToProfile = (): JSX.Element => {
  const {t} = useTranslation()
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <h1>{t('notAuthorized')}</h1>
      <Link href={Routes.profile}>
        <Button>{t('goToAuth')}</Button>
      </Link>
    </div>
  )
}

export default GoToProfile

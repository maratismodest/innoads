import Link from 'next/link'
import {useTranslation} from 'next-i18next'
import React from 'react'
import {Routes} from 'utils/routes'

const GoToProfile = (): JSX.Element => {
    const {t} = useTranslation()
    return (
        <div className='flex w-full flex-col items-center justify-center'>
            <h1>{t('notAuthorized')}</h1>
            <Link href={Routes.profile}>
                <button className='button'>{t('goToAuth')}</button>
            </Link>
        </div>
    )
}

export default GoToProfile

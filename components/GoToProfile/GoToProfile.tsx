import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { titles } from 'utils/constants'
import { Routes } from 'utils/routes'

import Button from 'components/Button/Button'
import Layout from 'components/Layout/Layout'

const GoToProfile = (): JSX.Element => {
    const { t } = useTranslation()
    return (
        <Layout title={titles.auth}>
            <div className='center'>
                <h2>{t('notAuthorized')}</h2>
                <Link href={Routes.profile}>
                    <Button>{t('goToAuth')}</Button>
                </Link>
            </div>
        </Layout>
    )
}

export default GoToProfile

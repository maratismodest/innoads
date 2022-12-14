import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import React from 'react'
import cn from 'classnames'
import { Routes, titles } from 'utils/constants'

import Button from 'components/Button/Button'
import Layout from 'components/Layout/Layout'

import goto from './GoToProfile.module.scss'
import classes from 'styles/classes.module.scss'

const GoToProfile = (): JSX.Element => {
    const { t } = useTranslation()
    return (
        <Layout title={titles.auth}>
            <div className={cn(classes.center, goto.goto)}>
                <h2>{t('notAuthorized')}</h2>
                <Link href={Routes.profile} className={goto.gotoLink}>
                    <Button>{t('goToAuth')}</Button>
                </Link>
            </div>
        </Layout>
    )
}

export default GoToProfile

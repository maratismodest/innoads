import Link from 'next/link'
import {useTranslation} from 'next-i18next'
import React from 'react'
import cn from 'classnames'
import {titles} from 'utils/constants'
import {Routes} from 'utils/routes'

import Button from 'components/Button/Button'
import Layout from 'components/Layout/Layout'

import classes from './GoToProfile.module.scss'

const GoToProfile = (): JSX.Element => {
    const {t} = useTranslation()
    return (
        <Layout title={titles.auth}>
            <div className={cn('center', classes.goto)}>
                <h2>{t('notAuthorized')}</h2>
                <Link href={Routes.profile}>
                    <Button>{t('goToAuth')}</Button>
                </Link>
            </div>
        </Layout>
    )
}

export default GoToProfile

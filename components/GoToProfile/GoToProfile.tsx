import { Routes, titles } from '../../constants'
import Button from 'components/Button/Button'
import Layout from 'components/Layout/Layout'
import Link from 'next/link'
import React from 'react'
import classes from 'styles/classes.module.scss'
import { useTranslation } from 'next-i18next'

const GoToProfile = (): JSX.Element => {
    const {t} = useTranslation()
    return (
        <Layout title={titles.auth}>
            <div className={classes.center} style={{marginTop:100}}>
                <h2>{t('notAuthorized')}</h2>
                <Link href={Routes.profile} style={{marginTop:40}}>
                    <Button>{t('goToAuth')}</Button>
                </Link>
            </div>
        </Layout>
    )
}

export default GoToProfile

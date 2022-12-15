import Script from 'next/script'
import { GetStaticProps } from 'next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useEffect, useState } from 'react'

import BotForm from 'components/BotForm'

export default function Bot() {
    const [tg, setTg] = useState()
    useEffect(() => {
        // @ts-ignore
        if (window.Telegram.WebApp) {
            // @ts-ignore
            setTg(window.Telegram.WebApp)
        }
    }, [])

    if (!tg) {
        return (
            <h1 style={{padding: 16}}>Грузим бота</h1>
        )
    }

    return (
        <BotForm tg={tg} />
    )


}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['common'])),
        },
    }
}
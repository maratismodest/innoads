import Script from 'next/script'
import { GetStaticProps } from 'next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useState } from 'react'

import BotForm from 'components/BotForm/BotForm'

export default function Bot() {
    const [tg, setTg] = useState()

    if (!tg) {
        return (
            <>
                <Script src='https://telegram.org/js/telegram-web-app.js' onReady={() => {
                    // @ts-ignore
                    const res = window.Telegram.WebApp
                    if (res)
                        setTg(res)
                }} />
                <h1 style={{ padding: 16 }}>Грузим бота</h1>
            </>

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

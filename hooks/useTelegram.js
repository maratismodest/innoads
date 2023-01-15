import Script from 'next/script'
import { useEffect, useState } from 'react'

import isBrowser from './isBrowser'


export function useTelegram() {
    const [tg, setTg] = useState({})

    if (typeof window !== 'undefined' && window.Telegram.WebApp) {
        //This code is executed in the browser
        // console.log('www', window.Telegram.WebApp)
    }

    useEffect(() => {
        // console.log(window)
        if (window.Telegram.WebApp) {
            const currentTg = window.Telegram.WebApp
            setTg(currentTg)
        }

    }, [])

    if (!tg) {
        return null
    }


    const onClose = () => {
        tg.close()
    }

    const onToggleButton = () => {
        if (tg.MainButton.isVisible) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }

    return {
        onClose,
        onToggleButton,
        tg,
        user: tg.initDataUnsafe?.user,
        queryId: tg.initDataUnsafe?.query_id,
        theme: tg.initDataUnsafe?.theme,
    }
}

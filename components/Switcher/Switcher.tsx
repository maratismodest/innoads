import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'
import Switch from 'react-switch'

import classes from './Switcher.module.scss'

const Switcher = () => {
    const router = useRouter()
    const { i18n } = useTranslation()

    const { pathname, asPath, query } = router
    return (
        <Switch
            checkedIcon={
                <div className={classes.switch}>En</div>
            }
            uncheckedIcon={
                <div className={classes.switch}>Ru</div>
            }
            onChange={async () => {
                await router.push(
                    {
                        pathname,
                        query,
                    },
                    asPath,
                    {
                        locale:
                            i18n.language === 'en' ? 'ru' : 'en',
                    },
                )
            }}
            checked={i18n.language === 'en'}
        />
    )
}

export default Switcher

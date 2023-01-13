import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import React from 'react';

import Switch from "components/Switch/Switch";

const LanguageSwitcher = () => {
    const router = useRouter()
    const {i18n} = useTranslation()
    const {pathname, asPath, query} = router
    const onChange = async () => {
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
    }
    return (
        <Switch onChange={onChange} id='language' isChecked={i18n.language === 'en'} data-off='Ru' data-on='En'/>
    );
};

export default LanguageSwitcher;
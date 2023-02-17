import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'

const Switcher = () => {
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
        <label className='relative inline-flex cursor-pointer items-center'>
            <input type='checkbox' value='' className='peer sr-only' onChange={onChange} />
            <div className="dark:bg-gray after:border-gray dark:border-gray peer h-6 w-11 rounded-full bg-green after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue dark:peer-focus:ring-blue"></div>
            <span className='text-gray dark:text-gray ml-3'>{i18n.language === 'en' ? 'En' : 'Ru'}</span>
        </label>
    )
}

export default Switcher

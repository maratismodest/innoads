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
        <label className='relative inline-flex items-center cursor-pointer'>
            <input type='checkbox' value='' className='sr-only peer' onChange={onChange} />
            <div className="w-11 h-6 bg-green peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue dark:peer-focus:ring-blue rounded-full peer dark:bg-gray peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray peer-checked:bg-blue"></div>
            <span className='ml-3 text-gray dark:text-gray'>{i18n.language === 'en' ? 'En' : 'Ru'}</span>
        </label>
    )
}

export default Switcher

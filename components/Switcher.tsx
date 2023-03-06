import {useRouter} from 'next/router'
import {useTranslation} from 'next-i18next'
import React from 'react'


const Switcher = (): JSX.Element => {
  const router = useRouter()
  const {i18n} = useTranslation()
  const {pathname, asPath, query} = router
  // @ts-ignore
  const language =  i18n.language
  const onChange = async () => {
    await router.push(
      {
        pathname,
        query,
      },
      asPath,
      // @ts-ignore
      {locale: language === 'en' ? 'ru' : 'en'},
    )
  }
  return (
    <label className='relative inline-flex cursor-pointer items-center'>


      <input type='checkbox' value='' className='peer sr-only' onChange={onChange} checked={language === 'en'}/>
      <div
        className="after:border-gray peer h-6 w-11 rounded-full bg-green after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue"></div>
      <span className='text-gray ml-3'>{language === 'en' ? 'En' : 'Ru'}</span>
    </label>
  )
}

export default Switcher

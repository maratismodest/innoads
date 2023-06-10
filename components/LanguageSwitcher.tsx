import Switcher from "@/components/ui/Switcher";
import {useTranslation} from 'next-i18next'
import {useRouter} from 'next/router'
import React, {useMemo} from 'react'

export default function LanguageSwitcher() {
  const router = useRouter()
  const {i18n} = useTranslation()
  const {pathname, asPath, query} = router
  const language = i18n.language
  const checked = useMemo(() => language === 'en', [language])

  const onChange = async () => {
    await router.push(
      {
        pathname,
        query,
      },
      asPath,
      {locale: checked ? 'ru' : 'en'},
    )
  }

  return (
    <div className='inline-flex gap-2 relative cursor-pointer'>
      <Switcher checked={checked} onChange={onChange}/>
      <label htmlFor='language'>{checked ? 'En' : 'Ru'}</label>
    </div>

  )
}

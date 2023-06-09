import buttonStyles from "@/styles/buttonStyles";
import {routes} from '@/utils/constants'
import Link from 'next/link'
import React from 'react'

export default function GoToProfile() {
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <h1>Вы не авторизованы</h1>
      <Link href={routes.profile} className={buttonStyles()}>
        Перейти на страницу авторизации
      </Link>
    </div>
  )
}



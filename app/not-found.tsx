import Button from '@/components/ui/Button'
import {routes, seo} from '@/utils/constants'
import {Metadata} from "next";
import Link from 'next/link'

export const metadata: Metadata = seo.notFound

export default function ErrorPage() {
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <h1>Страница не найдена</h1>
      <Link href={routes.main}>
        <Button>На главную</Button>
      </Link>
    </div>
  )
}

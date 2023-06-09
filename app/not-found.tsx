import Button from '@/components/ui/Button'
import {routes} from '@/utils/constants'
import Link from 'next/link'

export default function ErrorPage() {
  return (
    <div className='flex'>
      <div className='flex w-full flex-col items-center justify-center'>
        <h1>Страница не найдена</h1>
        <Link href={routes.main}>
          <Button>На главную</Button>
        </Link>
      </div>
    </div>
  )
}

import Button from '@/components/ui/Button';
import buttonStyles from '@/styles/buttonStyles';
import { routes } from '@/utils/constants';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className='flex justify-center items-center flex-col flex-1 gap-2'>
      <Image src='/images/error-404.png' alt='404' width={128} height={128} />
      <h1>Страница не найдена</h1>
      <Link className={buttonStyles()} href={routes.main}>На главную</Link>
    </div>
  );
}

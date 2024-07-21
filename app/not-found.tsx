import Image from 'next/image';
import Link from 'next/link';

import buttonStyles from '@/styles/buttonStyles';
import { routes } from '@/utils/constants';

const metaTitle = 'Ошибка 404. Страница не найдена';
export async function generateMetadata() {
  return {
    title: metaTitle,
    openGraph: {
      title: metaTitle,
      siteName: process.env.NEXT_PUBLIC_APP_NAME,
      locale: process.env.NEXT_PUBLIC_LANGUAGE,
    },
  };
}

export default function NotFoundPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2">
      <Image src="/images/error-404.png" alt="404" width={128} height={128} />
      <h1>Страница не найдена</h1>
      <Link className={buttonStyles()} href={routes.main}>
        На главную
      </Link>
    </div>
  );
}

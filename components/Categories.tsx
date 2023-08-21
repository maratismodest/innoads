'use client'
import {useTranslation} from '@/app/i18n/client';
import {categories} from '@/utils/categories';
import Image from 'next/image';
import Link from 'next/link';
import buy from '@/assets/images/buy.png'
import sell from '@/assets/images/sell.png'
import free from '@/assets/images/free.png'
import estate from '@/assets/images/estate.png'
import services from '@/assets/images/services.png'
import clothes from '@/assets/images/clothes.png'
import noImage from '@/assets/images/no-image.jpeg'
const src = (label: string) => {
  switch (label) {
    case 'buy':
      return buy
    case 'sell':
      return sell
    case 'clothes':
      return clothes
    case 'free':
      return free
    case 'services':
      return services
    case 'estate':
      return estate
    default:
      return noImage
  }
}
export default function Categories() {
  const {t} = useTranslation();
  return (
    <ul
      className='mb-1 flex snap-x snap-mandatory justify-between gap-12 overflow-scroll rounded-2xl bg-gray px-8 py-2'
    >
      {categories.map(({value, label}, index) => {

        return (
          <li key={value} tabIndex={index + 1}>
            <Link
              href={{
                pathname: '/search',
                query: {categoryId: value}
              }}
              className='flex flex-col w-10 snap-center items-center justify-between'
            >
              <Image
                src={src(label)}
                alt={label}
                width={40}
                height={40}
                className='relative rounded-[50%] bg-white p-2 shadow transition-all hover:scale-110'
              />
              <h5>{t(label)}</h5>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

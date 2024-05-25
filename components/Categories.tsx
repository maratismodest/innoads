import { CategoryDTO } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface CategoriesProp {
  categories: Readonly<CategoryDTO>[];
}

export default function Categories({ categories }: CategoriesProp) {
  return (
    <ul className="mb-1 flex snap-x snap-mandatory justify-between gap-12 overflow-scroll rounded-2xl bg-gray px-8 py-1">
      {categories.map(({ id, name, label, image }, index) => {
        return (
          <li key={id} tabIndex={index + 1}>
            <Link
              href={{
                pathname: '/search',
                query: { categoryId: id },
              }}
              className="flex w-10 snap-center flex-col items-center justify-between"
            >
              <Image
                src={image}
                alt={label}
                width={40}
                height={40}
                className="relative rounded-[50%] bg-white p-2 shadow transition-all hover:scale-110"
              />
              <h5 className="mb-0">{label}</h5>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

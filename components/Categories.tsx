import {categories} from "@/utils/categories";
import Image from "next/image";
import Link from "next/link";
import {useTranslation} from "next-i18next";

export default function Categories() {
  const {t} = useTranslation();
  return (
    <ul
      className="mb-1 flex snap-x snap-mandatory justify-between gap-12 overflow-scroll rounded-2xl bg-gray px-8 py-2">
      {categories.map(({value, label}, index) => {
        return (
          <li key={value} tabIndex={index + 1}>
            <Link
              href={{
                pathname: "/search",
                query: {categoryId: value},
              }}
              className="flex flex-col w-10 snap-center items-center justify-between"
            >
              <Image
                src={`/images/${label}.png`}
                alt={label}
                width={40}
                height={40}
                className="relative rounded-[50%] bg-white p-2 shadow transition-all hover:scale-110"
              />
              <h5>{t(label)}</h5>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

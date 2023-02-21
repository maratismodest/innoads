import Image from "next/image";
import Link from "next/link";
import {useTranslation} from "next-i18next";
import {categories} from "utils/options";

const Categories = (): JSX.Element => {
  const {t} = useTranslation();
  return (
    <ul
      className="mb-1 flex snap-x snap-mandatory justify-between gap-12 overflow-scroll rounded-2xl bg-grey px-4 py-2">
      {categories.map(({value, image, label}, index) => {
        return (
          <li key={value} tabIndex={index + 1}>
            <Link
              href={{
                pathname: "/search",
                query: {categoryId: value},
              }}
              className="flex w-10 snap-center flex-col items-center justify-between"
            >
              <button
                aria-label={label}
                className="relative aspect-square w-full overflow-hidden rounded-[50%] bg-white p-2 shadow transition-all hover:scale-110">
                <Image
                  src={image}
                  alt={label}
                  fill={true}
                  style={{
                    objectFit: "contain",
                    padding: 8,
                  }}
                />
              </button>

              <h5>{t(label)}</h5>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Categories;

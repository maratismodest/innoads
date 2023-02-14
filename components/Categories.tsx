import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { categories } from 'utils/options'


const Categories = (): JSX.Element | null => {
    const { t } = useTranslation()
    return (
        <ul className='mb-1 flex gap-12 bg-grey rounded-2xl overflow-scroll snap-x px-8 py-2'>
            {categories.map(({ value, image, label }, index) => {
                return (
                    <li key={value} tabIndex={index}>
                        <Link
                            href={{
                                pathname: '/search',
                                query: { categoryId: value },
                            }}
                            className='w-10 flex flex-col align-baseline justify-between snap-center'
                        >

                            <div
                                className='relative bg-white w-full aspect-square rounded-[50%] p-2 overflow-hidden shadow transition-all hover:scale-110'>
                                <Image
                                    src={image}
                                    alt={label}
                                    fill={true}
                                    style={{
                                        objectFit: 'contain',
                                        padding: 8,
                                    }}
                                />
                            </div>

                            <h5>{t(label)}</h5>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default Categories

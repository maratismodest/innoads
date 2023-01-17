import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { categories } from 'utils/options'

import styles from './Categories.module.scss'

const Categories = (): JSX.Element | null => {
    const { t } = useTranslation()
    return (
        <ul className={styles.categories}>
            {categories.map(({ value, image, label }, index) => {
                return (
                    <li key={value} tabIndex={index}>
                        <Link
                            href={{
                                pathname: '/search',
                                query: { categoryId: value },
                            }}
                            className={styles.category}
                        >
                            <div className={styles.categoryImg}>
                                <Image
                                    src={image}
                                    alt={label}
                                    fill={true}
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

import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import cn from 'classnames'
import { categories } from 'utils/options'

import styles from './Categories.module.scss'

const Categories = (): JSX.Element | null => {
    const { t } = useTranslation()
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    if (!mounted) return null
    return (
        <ul
            className={cn(styles.categories, {
                [styles.categoriesIsMobile]: isMobile,
            })}
        >
            {categories.map(({ value, image, label }, index) => {
                return (
                    <li key={value} tabIndex={index}>
                        <Link
                            href={{
                                pathname: '/search',
                                query: { categoryId: value },
                            }}
                            className={cn(styles.category, {
                                [styles.categoryIsMobile]: isMobile,
                            })}
                        >
                            <div className={styles.categoryImg}>
                                <Image
                                    src={image}
                                    alt={label}
                                    fill={true}
                                    style={{ objectFit: 'contain', padding: 8 }}
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

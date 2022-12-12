import styles from './Categories.module.scss'
import { categories } from 'assets/options'
import cn from 'classnames'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'

const Categories = (): JSX.Element | null => {
    const [mounted, setMounted] = useState(false)
    const { t } = useTranslation()
    useEffect(() => setMounted(true), [])
    if (!mounted) return null
    return (
        <ul
            className={cn(styles.categories, {
                [styles.categoriesIsMobile]: isMobile,
            })}
        >
            {categories.map((item, index) => {
                return (
                    <li key={index}>
                        <Link
                            href={{
                                pathname: '/search',
                                query: { category: item.value },
                            }}
                        >
                            <div
                                className={cn(styles.category, {
                                    [styles.categoryIsMobile]: isMobile,
                                })}
                            >
                                <div className={styles.categoryImg}>
                                    <Image
                                        src={item.image}
                                        alt={item.label}
                                        width={32}
                                        height={32}
                                    />
                                </div>
                                <h5>{t(item.label)}</h5>
                            </div>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default Categories

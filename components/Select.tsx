import { useTranslation } from 'next-i18next'
import React, { HTMLProps } from 'react'
import { clsx } from 'clsx'
import { categories } from 'utils/options'

type Props = HTMLProps<HTMLSelectElement> & {}

const Select = ({ className, ...props }: Props) => {
    const { t } = useTranslation()
    return (
        <select
            className={clsx('select', className)}
            {...props}
        >
            {categories.map(({ value, label }) =>
                <option key={value} value={value}>{t(label)}</option>)}
        </select>
    )
}

export default Select

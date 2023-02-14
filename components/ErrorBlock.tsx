import { useTranslation } from 'next-i18next'
import React from 'react'
import { FieldErrors } from 'react-hook-form'

type InputType = 'categoryId' | 'price' | 'title' | 'body'


const ErrorBlock = ({ name, errors }: Props) => {
    const { t } = useTranslation()
    return <span className='text-red mb-2'>{errors![name] ? t('required') : null}</span>
}

type Props = {
    name: InputType,
    errors?: FieldErrors,
    text?: string
}

export default ErrorBlock

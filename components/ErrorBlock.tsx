import {useTranslation} from 'next-i18next'
import React, {HTMLProps} from 'react'
import {FieldErrors} from 'react-hook-form'

type InputType = 'categoryId' | 'price' | 'title' | 'body'

const ErrorBlock = ({name, errors}: ErrorBlockProps) => {
    const {t} = useTranslation()
    return <span className='mb-2 text-red'>{errors![name] ? t('required') : null}</span>
}

interface ErrorBlockProps extends HTMLProps<HTMLSpanElement> {
    name: InputType,
    errors?: FieldErrors
}

export default ErrorBlock

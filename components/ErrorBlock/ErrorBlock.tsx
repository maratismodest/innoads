import { useTranslation } from 'next-i18next'
import React from 'react'
import { ErrorProps } from 'utils/constants'

import error from './ErrorBlock.module.scss'

const ErrorBlock = ({ name, errors }: ErrorProps) => {
    const { t } = useTranslation()
    return <span className={error.error}>{errors![name] ? t('required') : null}</span>
}
export default ErrorBlock

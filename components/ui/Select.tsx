import {useTranslation} from 'next-i18next'
import React, {useMemo} from 'react'
import ReactSelect from "react-select";
import {clsx} from 'clsx'
import {SelectProps} from '@/utils/options'

const Select = ({className, defaultValue, ...props}: any) => {
  const {t} = useTranslation()

  const options: SelectProps[] = useMemo(() => [
    {value: 1, label: t('sell')},
    {value: 3, label: t('services')},
    {value: 5, label: t('estate')},
    {value: 2, label: t('buy')},
    {value: 7, label: t('free')},
    {value: 6, label: t('clothes')},
  ], [t])

  return (
    <ReactSelect
      defaultValue={options.find(x => x.value === defaultValue)}
      className={clsx('z-20', className)}
      placeholder={t('chooseCategory')}
      aria-label='select'
      options={options}
      {...props}
    />
  )
}

export default Select

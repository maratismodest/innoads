import {useTranslation} from 'next-i18next'
import React, {useMemo} from 'react'
import ReactSelect from "react-select";
import {clsx} from 'clsx'
import {selectOptions} from '@/utils/options'

const Select = ({className, ...props}: any) => {
  const {t} = useTranslation()
  const options = useMemo(() => selectOptions.map(x => ({...x, label: t(x.label)})), [t])

  return (
    <ReactSelect
      className={clsx('z-20', className)}
      placeholder={t('chooseCategory')}
      aria-label='select'
      options={options}
      {...props}
    />
  )
}

export default Select

import {categories} from "@/utils/categories";
import {clsx} from 'clsx'
import {useTranslation} from 'next-i18next'
import React, {useMemo} from 'react'
import ReactSelect from "react-select";

const Select = ({className, defaultValue, label, ...props}: any) => {
  const {t} = useTranslation()

  const options = useMemo(() => categories.map(({value, label}) => ({value, label: t(label)})), [t])

  return (
    <div className='grid'>
      {label && <label htmlFor='select'>{label}</label>}
      <ReactSelect
        id="select"
        defaultValue={options.find(x => x.value === defaultValue)}
        className={clsx('z-20', className)}
        placeholder={t('chooseCategory')}
        aria-label='select'
        options={options}
        {...props}
      />
    </div>
  )
}

export default Select

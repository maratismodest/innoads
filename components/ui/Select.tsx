import useValidation from "@/hooks/useValidation";
import {categories} from "@/utils/categories";
import {clsx} from 'clsx'
import React, {useMemo} from 'react'
import ReactSelect from "react-select";

export default function Select({className, defaultValue, label, validations, value, name, ...props}: any) {
  const error = useValidation(value, validations)

  const options = useMemo(() => categories.map(({value, label, ru}) => ({value, label: ru})), [])

  return (
    <div className='grid'>
      {label && <label htmlFor={name}>{label}</label>}
      <ReactSelect
        id="select"
        data-testid={name}
        name={name}
        defaultValue={options.find(x => x.value === defaultValue)}
        className={clsx('z-20', className)}
        placeholder="Выберите категорию"
        aria-label='select'
        options={options}
        {...props}
      />
      {error && <span className="text-red">{error}</span>}
    </div>
  )
}

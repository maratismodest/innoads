import {clsx} from "clsx";
import React from 'react'

type Props = React.HTMLProps<HTMLInputElement> & {}
const Switcher = ({checked, onChange}: Props): JSX.Element => {
  return (
    <div className='inline-flex gap-2 relative cursor-pointer'>
      <input
        type='checkbox'
        className='absolute opacity-0 w-full h-full z-20 cursor-pointer'
        checked={checked}
        onChange={onChange}
      />
      <div className={clsx("h-6 w-11 rounded-full flex items-center px-1 bg-blue", checked && 'justify-end')}>
        <div className={clsx('h-4 w-4 rounded-full bg-white')}/>
      </div>
    </div>
  )
}

export default Switcher

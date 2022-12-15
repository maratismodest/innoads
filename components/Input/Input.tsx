import React, { ChangeEventHandler, forwardRef, HTMLInputTypeAttribute, ReactNode } from 'react'
import cn from 'classnames'

import classes from './Input.module.scss'

interface InputProp extends React.ComponentPropsWithoutRef<'input'> {
    children?: ReactNode,
    name?: string,
    required?: boolean,
    register?: any,
    type?: HTMLInputTypeAttribute,
    placeholder?: string,
    id?: string,
    hidden?: boolean
    onChange?: (ChangeEventHandler<HTMLInputElement> | undefined) | any
    multiple?: boolean,
    accept?: string,
    defaultValue?: string | number | string[] | undefined
    value?: any,
    style?: any,
    className?: string
}

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputProp>(({
                   id,
                   children,
                   name,
                   required,
                   onChange,
                   register,
                   hidden = false,
                   type = 'text',
                   placeholder,
                   multiple = false,
                   accept,
                   defaultValue,
                   className,
                   ...props
               }, ref): JSX.Element => {
    const formRegister = register ? { ...register(name, { required }) } : null
    return (
        <input id={id}
               ref={ref}
               hidden={hidden}
               accept={accept}
               type={type}
               defaultValue={defaultValue}
               onChange={onChange}
               placeholder={placeholder}
               className={cn(classes.input, className)}
               multiple={multiple}
               {...formRegister}
               {...props}

        >
            {children}
        </input>
    )
})
export default Input

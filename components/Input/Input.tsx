import React, { ChangeEventHandler, HTMLInputTypeAttribute, ReactNode } from 'react'
import classes from './Input.module.scss'
import cn from 'classnames'

interface InputProp {
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

const Input = ({
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
               }: InputProp): JSX.Element => {
    const formRegister = register ? { ...register(name, { required }) } : null
    return (
        <input id={id}
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
}
export default Input

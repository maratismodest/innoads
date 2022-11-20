import cn from 'classnames'
import React, { HTMLInputTypeAttribute, ReactNode } from 'react'
import classes from './Search.module.scss'

interface SearchProps {
    children?: ReactNode,
    name?: string,
    required?: boolean,
    className?: string,
    register?: any
    type?: HTMLInputTypeAttribute,
    placeholder?: string,
    defaultValue?: any
}

const Search = ({
                    children,
                    placeholder,
                    type = 'text',
                    name,
                    required,
                    className,
                    register,
                    defaultValue,
                    ...props
                }: SearchProps): JSX.Element => {
    const formRegister = register ? register(name, { required }) : null
    return (
        <input type={type} defaultValue={defaultValue} placeholder={placeholder}
               className={cn(classes.input, className)} {...formRegister} {...props}>
            {children}
        </input>
    )

}
export default Search

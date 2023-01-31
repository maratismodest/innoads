import React from 'react'
import {clsx} from 'clsx'

import classes from './Search.module.scss'

interface SearchProps extends React.HTMLProps<HTMLInputElement> {
    name?: string,
    register?: any
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
               className={clsx(classes.input, className)} {...formRegister} {...props}>
            {children}
        </input>
    )

}
export default Search

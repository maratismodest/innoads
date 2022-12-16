import React, { ChangeEventHandler, forwardRef } from 'react'
import cn from 'classnames'

import classes from './Input.module.scss'

interface InputProp extends React.ComponentPropsWithoutRef<'input'> {
    register?: any,
    onChange?: (ChangeEventHandler<HTMLInputElement> | undefined) | any
    multiple?: boolean,
    accept?: string,
}

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputProp>(({
                                                           name,
                                                           onChange,
                                                           register,
                                                           className,
                                                           children,
                                                           required,
                                                           ...props
                                                       }, ref): JSX.Element => {
    const formRegister = register ? { ...register(name, { required }) } : null
    return (
        <input
            ref={ref}
            onChange={onChange}
            className={cn(classes.input, className)}
            {...formRegister}
            {...props}

        >
            {children}
        </input>
    )
})
export default Input

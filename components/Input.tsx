import React, { ChangeEventHandler, forwardRef } from 'react'
import { clsx } from 'clsx'

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
            className={clsx('rounded h-12 px-4', className)}
            {...formRegister}
            {...props}

        >
            {children}
        </input>
    )
})
export default Input

//     .input {
//     border-radius: 4px;
//     height: 48px;
//     padding: 0 16px;
//     border: 1px solid hsl(0deg 0% 80%);
//
// &:focus {
//         outline: none;
//     }
// }

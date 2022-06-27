import React, {ChangeEventHandler, HTMLInputTypeAttribute, ReactNode} from "react";
import classes from './Input.module.scss'

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
    style?: any
}

const Input = ({
                   id,
                   children,
                   name,
                   required,
                   onChange,
                   register,
                   hidden = false,
                   type = "text",
                   placeholder,
                   multiple = false,
                   accept,
                   defaultValue,
                   ...props
               }: InputProp): JSX.Element => {
    if (register) {
        return (
            <input
                id={id}
                accept={accept}
                hidden={hidden}
                type={type}
                placeholder={placeholder}
                className={classes.input}
                {...register(name, {required})}
                onChange={onChange}
                multiple={multiple}
                defaultValue={defaultValue}
                {...props}

            >
                {children}
            </input>
        )
    }
    return (
        <input id={id}
               hidden={hidden}
               accept={accept}
               type={type}
               defaultValue={defaultValue}
               onChange={onChange}
               placeholder={placeholder}
               className={classes.input}
               multiple={multiple}
               {...props}>
            {children}
        </input>
    )
}
export default Input

import {OptionProps} from "assets/options";
import React from "react";
import Select from "react-select";

interface SelectInnoProps {
    options: OptionProps[],
    defaultValue?: OptionProps,
    name: string,
    required: boolean,
    onChange: any,
    value?: OptionProps,
    placeholder?: string;
}

const SelectInno = ({
                        options,
                        defaultValue,
                        value,
                        name,
                        onChange,
                        placeholder = 'Выберите категорию',
                        ...props
                    }: SelectInnoProps) => {

    return <Select options={options}
                   name={name}
                   placeholder={placeholder}
                   defaultValue={defaultValue}
                   onChange={onChange}
                   value={value}
                   {...props}/>;
};
export default SelectInno;

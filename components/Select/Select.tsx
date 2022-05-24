import React from "react";
import Select from "react-select";

const SelectInno = ({options, defaultValue, ...props}: any) => {
    return <Select options={options} placeholder='Выберите категорию' defaultValue={defaultValue} {...props}/>;
};
export default SelectInno;

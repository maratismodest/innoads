import React from "react";
import Select from "react-select";

const SelectInno = ({options, ...props}: any) => {
    return <Select options={options} {...props} placeholder='Выберите категорию'/>;
};
export default SelectInno;

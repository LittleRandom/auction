import { ChangeEvent, useState } from "react";

export function useFormInput<S>(initialState: S | (() => S)): any {
    // const [value, setValue] = useState(initialValue);
    const [formData, setFormData] = useState(initialState);


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleConditionChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            condition: value
        }));
    };

    const inputProps = {
        data: formData,
        setData: setFormData,
        onChange: handleInputChange,
        onConditionChange: handleConditionChange,
    };

    return inputProps;
}

import { useFormContext } from "react-hook-form";
import {TextField } from '@fluentui/react'
import { Controller } from "react-hook-form";
interface ITextFieldProps {
    name: string | number | any;
    typeOf?:string| number;
    label: string;
    isRequired : string;
    placeholder?: string;
}
const TextFieldForm = (
    {
        name,
        typeOf,
        label,
        isRequired,
        placeholder
    }: ITextFieldProps
) =>
{
const {control, register} = useFormContext();
return (
    <>
    <Controller
    control = {control}
    name={name}
    render = {({
        field,
        fieldState: {error, invalid,isTouched, isDirty},
    }) =>{
        return (
            <>
            <div className = { isRequired? (error ? "error": "errorGroup"):""}>
                <TextField type= { typeOf === 'number'? "number": 'text'}
                label = {label}
                placeholder = {placeholder}
                {...field} errorMessage = {error ? error.message: ""}
                className = {isRequired ? (error ? "error" : "errorGroup"): ""}
                />
            </div>
            </>
        )
    }}
    />
    </>
);
};
export default TextFieldForm;














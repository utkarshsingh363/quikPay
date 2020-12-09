import React from "react";
import {ErrorMessage } from "formik";
import TextError from "../TextError/TextError";
import '../formStyle.css'
import './SelectMultiple.css'

export default function SelectMultiple(props) {
  const { label, name, options} = props;
  return (
    <div className="form__control_multipleSelect">
       <label htmlFor={name}>{label}</label>
       <select className='multipleSelect' name={name} multiple onChange={props.handleChange}>
        {
            options.map(option=>(
                <option key={option.id} value={option.id} text={option.value} type={option.type} subType={option.subType}>
                    {option.value}
                </option>
            ))
        }
        </select>
      {/* <Field className="selet__field" as="select" id={name} name={name} {...rest}>
          {fieldOptions=>console.log(fieldOptions)}
        {options.map((option) => (
          <option key={option.id} id={option.id} value={option.value} >
            {option.value}
          </option>
        ))}
      </Field> */}
       <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

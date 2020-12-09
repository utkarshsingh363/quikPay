import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../TextError/TextError";

export default function Input(props) {
  const { label, name, ...rest } = props;
  return (
    <div className="form__control">
      <label htmlFor={name}>{label} :</label>
      <div className="form__control__field__div">
        <Field className='input__field' name={name} id={name} {...rest} />
        <ErrorMessage name={name} component={TextError} />
      </div>
    </div>
  );
}

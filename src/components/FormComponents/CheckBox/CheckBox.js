import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../TextError/TextError";
import './CheckBox.css'

export default function CheckBox(props) {
  const { name, label, options, ...rest } = props;
  return (
    <div className="form__control__checkbox">
      <label className='main__label' htmlFor={name}>{label}</label>
      <Field name={name} id={name} {...rest}>
        {({ field }) => {
          // console.log("Field", field);
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <input
                  type="checkbox"
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                />
                <p htmlFor={option.value}>{option.key}</p >
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}
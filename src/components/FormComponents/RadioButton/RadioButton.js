import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../TextError/TextError";
import './RadioButton.css'

export default function RadioButtons(props) {
  const { name, label, options, ...rest } = props;
  return (
    <div className="form__control__radio">
      <label className='main__label' htmlFor={name}>{label}:</label>
      <div className='radio__options'>
        <Field name={name} id={name} {...rest}>
          {({ field }) => {
            // console.log("Field", field);
            return options.map((option) => {
              return (
                <React.Fragment key={option.key}>
                  <input
                    type="radio"
                    id={option.value}
                    {...field}
                    value={option.value}
                    checked={field.value === option.value}
                  />
                  <p htmlFor={option.value}>{option.key}</p>
                </React.Fragment>
              );
            });
          }}
        </Field>
      </div>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}
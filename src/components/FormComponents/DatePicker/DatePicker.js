import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../TextError/TextError";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePicker(props) {
  const { name, label, ...rest } = props;
  return (
    <div className="form__control">
      <label htmlFor={name}>{label}</label>
      <div className="form__control__field__div">
        <Field name={name}>
          {({ field, form }) => {
            const { setFieldValue } = form;
            const { value } = field;
            return (
              <DateView
                id={name}
                {...field}
                {...rest}
                selected={value}
                onChange={(val) => setFieldValue(name, val)}
              />
            );
          }}
        </Field>
        <ErrorMessage name={name} component={TextError} />
      </div>
    </div>
  );
}

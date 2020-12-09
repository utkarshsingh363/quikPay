import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../FormControl/FormControl";

function FunctionContainer() {
  const dropdownOptions = [
    { key: "Select an Option", value: "" },
    { key: "Option 1", value: "option 1" },
    { key: "Option 2", value: "option 2" },
    { key: "Option 3", value: "option 3" }
  ];

  const radioOptions = [
    { key: "Select an Option", value: "" },
    { key: "Option 1", value: "roption 1" },
    { key: "Option 2", value: "roption 2" },
    { key: "Option 3", value: "roption 3" }
  ];

  const checkboxOptions = [
    { key: "Select an Option", value: "" },
    { key: "Option 1", value: "coption 1" },
    { key: "Option 2", value: "coption 2" },
    { key: "Option 3", value: "coption 3" }
  ];

  const initialValues = {
    email: "",
    description: "",
    selectOption: "",
    selectRadioOption: "",
    checkboxOption: [],
    birthDate: null
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Not a valid Email!").required("Required!"),
    description: Yup.string().required("Required!"),
    selectOption: Yup.string().required("Required!"),
    selectRadioOption: Yup.string().required("Required!"),
    checkboxOption: Yup.array().required("Required!"),
    birthDate: Yup.date().required("Required!").nullable()
  });

  const onSubmit = (values) => {
    console.log("Form data", values);
    console.log("Saved data", JSON.parse(JSON.stringify(values)));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <FormikControl
            control="input"
            label="Email"
            name="email"
            type="email"
          />
          <FormikControl
            control="textarea"
            label="Comment"
            name="description"
          />
          <FormikControl
            control="select"
            label="Selct a Topic"
            name="selectOption"
            options={dropdownOptions}
          />
          <FormikControl
            control="radio"
            label="Selct a Radio Option"
            name="selectRadioOption"
            options={radioOptions}
          />
          <FormikControl
            control="checkbox"
            label="Selct a Checkbox Option"
            name="checkboxOption"
            options={checkboxOptions}
          />
          <FormikControl
            control="date"
            label="Selct your Birth Date"
            name="birthDate"
          />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default FunctionContainer;

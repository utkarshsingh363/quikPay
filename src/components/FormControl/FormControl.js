import React from "react";
import Input from "../../components/FormComponents/InputField/InputField";
import TextArea from "../FormComponents/TextArea/TextArea";
import Select from "../FormComponents/Select/Select";
import RadioButtons from "../FormComponents/RadioButton/RadioButton";
import CheckBox from "../FormComponents/CheckBox/CheckBox";
import DatePicker from '../FormComponents/DatePicker/DatePicker'
import SelectMultiple from '../FormComponents/SelectMultiple/SelectMultiple'
function FormControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "selectMultiple":
      return <SelectMultiple {...rest} />;
    case "radio":
      return <RadioButtons {...rest} />;
    case "checkbox":
      return <CheckBox {...rest} />;
    case "date": return <DatePicker {...rest} />
    default:
      return null;
  }
}

export default FormControl;

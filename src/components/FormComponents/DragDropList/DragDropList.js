import React from "react";
import {ErrorMessage } from "formik";
import TextError from "../TextError/TextError";
import '../formStyle.css'
import './DragDropList.css'

export default function DragDropList(props) {
  const { label, name, options} = props;
  return (
    <div className="form__control_dragNdrop">
       <label htmlFor={name}>{label}</label>
        <div>
        {
            options.map(option=>(
                <option key={option.id} value={option.id} >
                    {option.value}
                </option>
            ))
        }
        </div>

       <select className='multipleSelect' name={name} multiple onChange={props.handleChange}>

        </select>
       <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

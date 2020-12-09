import React from "react";
import "./TextError.css";

export default function TextError(props) {
  return (
    <div className="text__error">
      <p>{props.children}</p>
    </div>
  );
}

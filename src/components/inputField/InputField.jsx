import React from "react";
import { Field } from "formik";
import "./styles.css";

const InputField = ({ fieldName, htmlName, error }) => {
  return (
    <div className="input-container">
      <label htmlFor={htmlName} className="label">
        {fieldName} <span className="asteric">*</span>
      </label>
      <Field
        name={htmlName}
        type="text"
        className={`input-field ${error ? "error-field" : ""}`}
      />
    </div>
  );
};

export default InputField;

import React from "react";
import { Field } from "formik";
import "./styles.css";

const SelectField = ({ htmlName, fieldName, data }) => {
  return (
    <div className="select-container">
      <label htmlFor={htmlName} className="label">
        {fieldName} <span className="asteric">*</span>
      </label>
      <Field as="select" name={htmlName} className="select-field">
        {data.map((element, index) => (
          <option value={element.title} key={element.title + index}>
            {element.title}
          </option>
        ))}
      </Field>
    </div>
  );
};

export default SelectField;

import { Formik, Form, useField } from "formik";

const CustomSelect = ({ label, isRequired = true, width, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="custom-field">
      <label className="label" htmlFor={props.id || props.name}>
        {label}
        {isRequired && <sup>*</sup>}
      </label>
      <select {...field} {...props} className={`form-input ${width}`} />
      {meta.touched || meta.error ? (
        <div className="error form-warning">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CustomSelect;

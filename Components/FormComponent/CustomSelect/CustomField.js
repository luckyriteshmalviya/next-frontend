const CustomField = ({
  field,
  form: { touched, errors, values },
  className,
  initialRender,
  isRequired = true,
  isNumbering = true,
  num,
  labelEdit,
  isError = true,
  isFile = false,

  ...props
}) => {
  return (
    <div className={`custom-field`}>
      {/* {isRequired && <span className="form-number">{num}</span>} */}
      <label className={`label ${labelEdit} `} htmlFor={field.name}>
        {props.labelName}

        {isRequired && <sup>*</sup>}
      </label>{" "}
      <input
        list={field.as}
        type="text"
        className={`${className} form-input ${
          errors[field.name] ? "input-error" : ""
        }`}
        {...props}
        {...field}
      />
      {isError && (
        <span
          className={`form-warning ${
            errors[field.name] || touched[field.name] ? "show" : "hide"
          }`}
        >
          {errors[field.name]}
        </span>
      )}
    </div>
  );
};

export default CustomField;

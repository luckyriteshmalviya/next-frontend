import React, { forwardRef, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomField from "../CustomSelect/CustomField";
import { PersistFormikValues } from "formik-persist-values";

var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .required("Please enter the required field")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
});

const RecruiterName = forwardRef((props, ref) => {
  return (
    <div className="custom-form-top">
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={SignupSchema}
        innerRef={ref}
      >
        {({ values, setFieldValue }) => (
          <>
            <Field
              name="name"
              placeholder="Your&nbsp;name..."
              labelName={`What's your name?`}
              component={CustomField}
            />

            <PersistFormikValues name="recruter-info" />
          </>
        )}
      </Formik>
    </div>
  );
});

export default RecruiterName;

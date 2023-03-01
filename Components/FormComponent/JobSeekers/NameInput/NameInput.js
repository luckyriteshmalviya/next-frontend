import React, { forwardRef, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomField from "../../CustomSelect/CustomField";
import { PersistFormikValues } from "formik-persist-values";
import { useSelector } from "react-redux";

var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("required")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
});

const NameInput = forwardRef((props, ref) => {
  const nameInput = useSelector((store) => store?.user?.userInfo?.name ?? "");

  return (
    <div className="custom-form-top">
      <Formik
        initialValues={{
          name: nameInput,
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
        }}
        innerRef={ref}
        // validateOnMount={true}
      >
        {({ values, setFieldValue }) => (
          <>
            <Field
              name="name"
              placeholder="Your&nbsp;name..."
              labelName={`What's your name?`}
              component={CustomField}
            />

            <PersistFormikValues name="name" />
          </>
        )}
      </Formik>
    </div>
  );
});

export default NameInput;

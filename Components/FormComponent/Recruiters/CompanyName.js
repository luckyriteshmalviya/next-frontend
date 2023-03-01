import React, { forwardRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomField from "../CustomSelect/CustomField";
import { PersistFormikValues } from "formik-persist-values";

const SignupSchema = Yup.object().shape({
  companyName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("required"),
});

const CompanyName = forwardRef((props, ref) => (
  <div className="custom-form-top">
    <Formik
      initialValues={{
        companyName: "",
      }}
      validationSchema={SignupSchema}
      innerRef={ref}
    >
      {({ errors, touched, handleSubmit }) => (
        <Form>
          <Field
            name="companyName"
            placeholder="Company Name..."
            labelName={`Enter your company name`}
            component={CustomField}
          />
          <PersistFormikValues name="recruter-info" />
        </Form>
      )}
    </Formik>
  </div>
));

export default CompanyName;

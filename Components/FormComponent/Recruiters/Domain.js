import React, { forwardRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomField from "../CustomSelect/CustomField";
import { PersistFormikValues } from "formik-persist-values";

const SignupSchema = Yup.object().shape({
  domain: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("required"),
});

const Domain = forwardRef((props, ref) => (
  <div className="custom-form-top">
    <Formik
      initialValues={{
        domain: "",
      }}
      validationSchema={SignupSchema}
      innerRef={ref}
    >
      {({ errors, touched, handleSubmit }) => (
        <Form>
          <Field
            name="domain"
            placeholder="Enter the domain..."
            labelName={`Which domain do you want to hire for?`}
            component={CustomField}
          />
          <PersistFormikValues name="recruter-info" />
        </Form>
      )}
    </Formik>
  </div>
));

export default Domain;

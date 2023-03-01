import React, { forwardRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomField from "../CustomSelect/CustomField";
import { PersistFormikValues } from "formik-persist-values";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("required")
    .matches(emailRegex, "Invalid email"),
});

const RecruiterEmail = forwardRef((props, ref) => (
  <div className="custom-form-top">
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        // same shape as initial values
        console.log(values);
      }}
      innerRef={ref}
      // validateOnMount={true}
    >
      <Form>
        <Field
          name="email"
          placeholder=" Your email"
          type="email"
          component={CustomField}
          labelName="Enter your email address"
        />
        <PersistFormikValues name="recruter-info" />
      </Form>
    </Formik>
  </div>
));
export default RecruiterEmail;

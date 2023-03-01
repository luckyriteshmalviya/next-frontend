import React, { forwardRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomField from "../../../FormComponent/CustomSelect/CustomField";
import { PersistFormikValues } from "formik-persist-values";
import { useSelector } from "react-redux";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("required")
    .matches(emailRegex, "Invalid email"),
});

const EmailInput = forwardRef((props, ref) => {
  const emailInput = useSelector((store) => store?.user?.userInfo?.email ?? "");
  return (
    <div className="custom-form-top">
      <Formik
        initialValues={{
          email: emailInput,
        }}
        validationSchema={SignupSchema}
        innerRef={ref}
      >
        <Form>
          <Field
            name="email"
            placeholder="Your email..."
            type="email"
            component={CustomField}
            labelName="Enter your email address"
          />
          <PersistFormikValues name="email" />
        </Form>
      </Formik>
    </div>
  );
});
export default EmailInput;

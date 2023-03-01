import React, { forwardRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomField from "../CustomSelect/CustomField";
import { PersistFormikValues } from "formik-persist-values";

const SignupSchema = Yup.object().shape({
  designation: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("required"),
});

const Designation = forwardRef((props, ref) => (
  <div className="custom-form-top">
    <Formik
      initialValues={{
        designation: "",
      }}
      validationSchema={SignupSchema}
      innerRef={ref}
    >
      {({ errors, touched, handleSubmit }) => (
        <Form>
          <Field
            name="designation"
            placeholder="Designation..."
            labelName={`What is your designation?`}
            component={CustomField}
          />
          <PersistFormikValues name="recruter-info" />
        </Form>
      )}
    </Formik>
  </div>
));

export default Designation;

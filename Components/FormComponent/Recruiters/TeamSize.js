import React, { forwardRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomField from "../CustomSelect/CustomField";
import { PersistFormikValues } from "formik-persist-values";

const SignupSchema = Yup.object().shape({
  companySize: Yup.string().matches(/^[0-9]/, "Should be a number"),
});

const TimeSize = forwardRef((props, ref) => (
  <div className="custom-form-top">
    <Formik
      initialValues={{
        companySize: "",
      }}
      validationSchema={SignupSchema}
      innerRef={ref}
    >
      {({ errors, touched, handleSubmit }) => (
        <Form>
          <Field
            name="companySize"
            type="number"
            placeholder="Time Size..."
            labelName={`Team size of company?`}
            component={CustomField}
          />
          <PersistFormikValues name="recruter-info" />
        </Form>
      )}
    </Formik>
  </div>
));

export default TimeSize;

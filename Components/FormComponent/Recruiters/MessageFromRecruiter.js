import React, { forwardRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { PersistFormikValues } from "formik-persist-values";
import { useDispatch } from "react-redux";
import { employerSignupHandler } from "services/user";

const ExperienceSchema = Yup.object().shape({
  message: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("equired"),
});

const MessageFromRecuiter = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  return (
    <div className="custom-form-top">
      <Formik
        initialValues={{
          message: "",
        }}
        validationSchema={ExperienceSchema}
        onSubmit={() => {
          employerSignupHandler();
        }}
        innerRef={ref}
      >
        {({ errors, touched }) => (
          <Form className="experience-container">
            <div className="custom-field">
              <label className="label">Do you want to include a message?</label>
              <Field
                as="textarea"
                className="project-description"
                type="text"
                name="message"
                placeholder="Defining your requirements will help us curate better candidates for you.."
              />
            </div>
            <PersistFormikValues name="recruter-info" />
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default MessageFromRecuiter;

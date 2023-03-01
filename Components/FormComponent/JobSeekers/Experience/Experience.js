import React, { forwardRef, useEffect, useState } from "react";
import { Formik, Form, Field, FieldArray, useFormikContext } from "formik";
import * as Yup from "yup";
import CustomField from "../../CustomSelect/CustomField";
import Button from "../../../Button/Button";
import { PersistFormikValues } from "formik-persist-values";
import { sendEmployeeDetails } from "services/user";

// const ExperienceSchema = Yup.object().shape({

const schema = Yup.object().shape({
  experience: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number(),
        companyName: Yup.string(),
        startingDate: Yup.date(),
        endingDate: Yup.date(),
        projectDescription: Yup.string(),
      })
    )
    .required("required")
    .min(1, "Minimum of 1 exp"),
});

const Experience = forwardRef((props, ref) => {
  const [selectedValue, setSelectedValue] = useState("");
  const setValue = (value) => {
    setSelectedValue(value);
  };

  return (
    <div className="custom-form-top">
      <Formik
        initialValues={{
          experience: [
            {
              companyName: "",
              startingDate: "",
              endingDate: "",
              projectDescription: "",
            },
          ],
        }}
        validationSchema={schema}
        onSubmit={async () => {
          return await sendEmployeeDetails();
        }}
        innerRef={ref}
        render={(formikProps) => (
          <Form>
            <FieldArray
              name="experience"
              render={({
                move,
                swap,
                push,
                insert,
                unshift,
                pop,
                handlePop,
                handlePush,
              }) => {
                let values = formikProps.values.experience;

                return (
                  <div className="experience-container">
                    {values &&
                      values.map((value, index) => {
                        const companyName = `experience[${index}].companyName`;
                        const startingDate = `experience[${index}].startingDate`;
                        const endingDate = `experience[${index}].endingDate`;
                        const projectDescription = `experience[${index}].projectDescription`;

                        return (
                          <div key={index}>
                            <Field
                              name={companyName}
                              placeholder="Name of company"
                              labelName={`Previous experience (job/internship):`}
                              component={CustomField}
                              className="short-input "
                              isRequired={false}
                            />
                            <div className="custom-field work-experience">
                              <label className="label">
                                <div className="year-of-experience">
                                  <div className="work-text"> Worked from:</div>
                                  <div>
                                    <Field
                                      className="experience-form-input"
                                      name={startingDate}
                                      type="date"
                                    />{" "}
                                    <span>to</span>
                                    <Field
                                      className="experience-form-input"
                                      name={endingDate}
                                      type="date"
                                    />
                                  </div>
                                </div>
                              </label>
                            </div>
                            <div className="custom-field">
                              <label className="label">
                                Project description{" "}
                                <span>
                                  <sup>*</sup>
                                </span>
                              </label>
                              <Field
                                as="textarea"
                                className="project-description"
                                type="text"
                                name={projectDescription}
                                placeholder="Describe your experience in 120 words. You can
                         include details of the technologies,
                         softwares, and resources used during the work.
                         Writing detailed description will help us
                         curate better opportunities for you."
                              />
                            </div>
                          </div>
                        );
                      })}
                    <div className="custom-field ">
                      <label className="label">
                        <div className="experience-add">
                          <div>
                            {" "}
                            Do you have want to add another experience:
                          </div>
                          <div className="experience-button">
                            <Button
                              nameone="Yes"
                              activeStateHandler={async () => {
                                setValue("Yes");
                                await values.push({
                                  companyName: "",
                                  startingDate: "",
                                  endingDate: "",
                                  projectDescription: "",
                                });
                                let newValues = values;
                                formikProps.setFieldValue(
                                  "experience",
                                  newValues
                                );
                              }}
                              active={selectedValue === "Yes"}
                              width="yes"
                            />
                            <Button
                              nameone="No"
                              activeStateHandler={async () => {
                                if (values.length === 1) return;
                                setValue("No");
                                await values.pop();
                                formikProps.setFieldValue("experience", values);
                              }}
                              active={selectedValue === "No"}
                              width="yes"
                            />
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                );
              }}
            />
            <PersistFormikValues name="experience" />
          </Form>
        )}
      />
    </div>
  );
});

export default Experience;

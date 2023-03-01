import { Field, Form, Formik } from "formik";
import { PersistFormikValues } from "formik-persist-values";
import { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import Button from "../../../Button/Button";
import CustomField from "../../CustomSelect/CustomField";

const SignupSchema = Yup.object().shape({
  currentSalary: Yup.string().required("required"),
  expectedSalary: Yup.string().required("required"),
});

const CurrentStatus = forwardRef((props, ref) => {
  const [selectedValue, setSelectedValue] = useState("");
  const currentlSalaryInput = useSelector(
    (store) => store?.user?.userInfo?.currentSalary ?? ""
  );
  const expectedSalaryInput = useSelector(
    (store) => store?.user?.userInfo?.currentSalary ?? ""
  );

  const setValue = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    let currentlyEmployed = localStorage.getItem("currentlyEmployed");

    if (currentlyEmployed) {
      setSelectedValue(currentlyEmployed);
    } else {
      localStorage.setItem("currentlyEmployed", selectedValue);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentlyEmployed", selectedValue);
  }, [selectedValue]);

  return (
    <div className="custom-form-top ">
      <Formik
        initialValues={{
          currentSalary: currentlSalaryInput,
          expectedSalary: expectedSalaryInput,
        }}
        validationSchema={SignupSchema}
        innerRef={ref}
        // validateOnMount={true}
      >
        {({ values, setFieldValue }) => (
          <>
            <div className="label-heading-salary">
              Are you currently employed?
              <span>
                <sup>*</sup>
              </span>
            </div>
            <div className="button-option">
              <Button
                nameone="Yes"
                activeStateHandler={() => {
                  setValue("Yes");
                  setFieldValue("currentSalary", "", true);
                  setFieldValue("expectedSalary", "", true);
                }}
                active={selectedValue === "Yes"}
              />
              <Button
                nameone="No"
                activeStateHandler={() => {
                  setValue("No");
                  setFieldValue("currentSalary", "NULL", true);
                  setFieldValue("expectedSalary", "");
                }}
                active={selectedValue === "No"}
              />
            </div>

            <div className="salary-detail">
              <div className="label-heading-salary">
                Expected salary?
                <span>
                  <sup>*</sup>
                </span>
                <div className="salary-text">monthly in hand salary</div>
              </div>
              <div className="salary-container">
                <Field
                  name="salary"
                  type="number"
                  placeholder="INR"
                  component={CustomField}
                  className="salary"
                  isRequired={false}
                  labelEdit="salary-label"
                  width="input-width"
                  onkeydown="javascript: return event.keyCode == 69 ? false : true"
                />
                <Field
                  type="number"
                  name="expectedSalary"
                  placeholder="CTC"
                  component={CustomField}
                  className="salary-two"
                  isRequired={false}
                  labelEdit="salary-label"
                />
              </div>
            </div>

            <div
              className={`salary-detail ${
                selectedValue === "Yes" ? "show" : "hide"
              }`}
            >
              {/* <Field
                name="currentSalary"
                placeholder=" current salary"
                labelName={`Current salary ?`}
                component={CustomField}
              /> */}

              <div className="salary-detail">
                <div className="label-heading-salary">
                  Current salary?
                  <span>
                    <sup>*</sup>
                  </span>
                  <div className="salary-text">monthly in hand salary</div>
                </div>
                <div className="salary-container">
                  <Field
                    name="salary"
                    type="number"
                    placeholder="INR"
                    component={CustomField}
                    className="salary"
                    isRequired={false}
                    labelEdit="salary-label"
                  />
                  <Field
                    name="currentSalary"
                    type="number"
                    placeholder="CTC"
                    component={CustomField}
                    className="salary-two"
                    labelEdit="salary-label"
                    isRequired={false}
                  />
                </div>
              </div>
            </div>
            <PersistFormikValues name="current-status" />
          </>
        )}
      </Formik>
    </div>
  );
});
export default CurrentStatus;

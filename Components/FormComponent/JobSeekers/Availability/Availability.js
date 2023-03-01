import { Field, Form, Formik } from "formik";
import { PersistFormikValues } from "formik-persist-values";
import { forwardRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import Button from "../../../Button/Button";

import CustomField from "../../CustomSelect/CustomField";

const NoSignupSchema = Yup.object().shape({
  availableAfter: Yup.string().required("required"),
  available: Yup.string(),
});

const Availability = forwardRef((props, ref) => {
  const [selectedValue, setSelectedValue] = useState("");
  const setValue = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    let immediateJoiner = localStorage.getItem("immediateJoiner");

    if (immediateJoiner) {
      setSelectedValue(immediateJoiner);
    } else {
      localStorage.setItem("immediateJoiner", selectedValue);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("immediateJoiner", selectedValue);
  }, [selectedValue]);

  const monthsVal = useSelector(
    (store) => store?.user?.userInfo?.data?.availableAfter ?? ""
  );

  return (
    <div className="custom-form-top">
      <div className="availability">
        <div className="label-heading">
          Are you available immediately<sup>*</sup>
        </div>
        <Formik
          initialValues={{
            availableAfter: monthsVal || "",
            available: "",
          }}
          validationSchema={NoSignupSchema}
          innerRef={ref}
        >
          {({ setFieldValue }) => (
            <>
              <div className="availability-button">
                <Button
                  nameone="Yes"
                  activeStateHandler={async () => {
                    setValue("Yes");
                    await setFieldValue("available", "Yes", true);
                    await setFieldValue("availableAfter", "NULL", true);
                  }}
                  active={selectedValue === "Yes"}
                ></Button>

                <Button
                  nameone="No"
                  active={selectedValue === "No"}
                  activeStateHandler={() => {
                    setValue("No");
                    setFieldValue("available", "No");
                    if (!monthsVal) setFieldValue("availableAfter", "");
                  }}
                />
              </div>

              <div
                className={`availability-status-no ${
                  selectedValue === "No" ? "show" : "hide"
                }`}
              >
                <Field
                  name="availableAfter"
                  type="number"
                  placeholder="Number of months..."
                  labelName={`Available after?`}
                  component={CustomField}
                  className={`customized-input-availibility`}
                />
                <PersistFormikValues
                  name="availableAfter"
                  ignoreValues="available"
                />
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
});
export default Availability;

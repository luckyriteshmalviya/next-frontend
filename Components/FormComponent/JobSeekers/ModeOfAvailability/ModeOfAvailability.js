import { Field, Formik } from "formik";
import { forwardRef, useState, useEffect } from "react";
import * as Yup from "yup";
import Button from "../../../Button/Button";
import CustomField from "../../CustomSelect/CustomField";
import React from "react";
import { PersistFormikValues } from "formik-persist-values";
import { useSelector } from "react-redux";
import CustomSelect from "Components/FormComponent/CustomSelect/CustomSelect";

const SignupSchema = Yup.object().shape({
  preferredLocation: Yup.string()
    .oneOf(
      ["Bangalore", "Mumbai", "Hyderabad", "Pune", "NULL"],
      "Select from provided locations"
    )
    .required("required"),
});

const MOdeOfAvailability = forwardRef((props, ref) => {
  const [selectedValue, setSelectedValue] = useState("");
  const prefferedLocationInput = useSelector(
    (store) => store?.user?.userInfo?.preferredLocation ?? ""
  );
  const setValue = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    let modeOfAvailability = localStorage.getItem("modeOfAvailability");

    if (modeOfAvailability) {
      setSelectedValue(modeOfAvailability);
    } else {
      localStorage.setItem("modeOfAvailability", selectedValue);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("modeOfAvailability", selectedValue);
  }, [selectedValue]);

  return (
    <div className="custom-form-top modeOfAvailability">
      <Formik
        initialValues={{
          preferredLocation: prefferedLocationInput,
        }}
        validationSchema={SignupSchema}
        innerRef={ref}
        // validateOnMount={true}
      >
        {({ values, setFieldValue }) => (
          <>
            <div className="label-heading">
              Mode of availability?<sup>*</sup>
            </div>
            <div className="button-option">
              <Button
                nameone="Work From Home"
                activeStateHandler={() => {
                  setValue("Work From Home");
                  setFieldValue("preferredLocation", "NULL");
                }}
                active={selectedValue === "Work From Home"}
                width="work-from-home"
              />
              <Button
                nameone="Office"
                activeStateHandler={() => {
                  setValue("Office");
                }}
                active={selectedValue === "Office"}
                width="office"
              />
            </div>

            <div
              className={`cityName ${
                selectedValue === "Office" ? "show" : "hide"
              }`}
            >
              <CustomSelect
                label={`Enter your preffered location?`}
                name="preferredLocation"
                width="location-width"
              >
                <option value="Select your Role">Enter your location</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
              </CustomSelect>
            </div>
            <PersistFormikValues name="preferredLocation" />
          </>
        )}
      </Formik>
    </div>
  );
});
export default MOdeOfAvailability;

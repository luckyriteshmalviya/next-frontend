import { Formik } from "formik";
import { PersistFormikValues } from "formik-persist-values";
import { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import Button from "../../../Button/Button";

const JobTypeSchema = Yup.object().shape({
  jobtype: Yup.string().required("required"),
});

const JobType = forwardRef((props, ref) => {
  const [selectedValue, setSelectedValue] = useState("");
  const jobTypeInput = useSelector(
    (store) => store?.user?.userInfo?.jobTypeInput ?? ""
  );
  const setValue = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    let jobType = localStorage.getItem("jobType");

    if (jobType) {
      setSelectedValue(jobType);
    } else {
      localStorage.setItem("jobType", selectedValue);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("jobType", selectedValue);
  }, [selectedValue]);

  return (
    <div className="custom-form-top bottom-height jobtype">
      <div className>
        <div className="label-heading">
          What are you looking for?<sup>*</sup>
        </div>
        <Formik
          initialValues={{
            jobtype: jobTypeInput,
          }}
          validationSchema={JobTypeSchema}
          innerRef={ref}
          // validateOnMount={true}
        >
          {({ values, setFieldValue }) => (
            <>
              <div className="button-option">
                <Button
                  nameone="Internship"
                  activeStateHandler={() => {
                    setValue("Internship");
                    setFieldValue("jobtype", "Internship");
                  }}
                  active={selectedValue === "Internship"}
                  width="internship"
                />
                <Button
                  nameone="Full Time Role"
                  activeStateHandler={() => {
                    setValue("Full Time Role");
                    setFieldValue("jobtype", "Full Time Role");
                  }}
                  active={selectedValue === "Full Time Role"}
                  width="fulltime"
                />
                <PersistFormikValues name="jobtype" />
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
});
export default JobType;

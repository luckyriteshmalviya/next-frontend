import { Formik, Form, Field } from "formik";
import { PersistFormikValues } from "formik-persist-values";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import CustomSelect from "../../CustomSelect/CustomSelect";

const SignupSchema = Yup.object({
  domain: Yup.string()
    .oneOf(["Designer", "development", "Product", "Other"], "Invalid Job Type")
    .required("required"),

  role: Yup.string()
    .oneOf(
      ["Entry Level", "Professional Level", "Managerial Level", "Other"],
      "Invalid Job Type"
    ) //
    .required("required"),
});

const DomainAndRole = forwardRef((props, ref) => {
  const domainInput = useSelector(
    (store) => store?.user?.userInfo?.domain ?? ""
  );
  const roleInput = useSelector((store) => store?.user?.userInfo?.role ?? "");

  return (
    <div className="domain-role-wrapper">
      <div className="custom-form-top">
        <Formik
          innerRef={ref}
          initialValues={{
            domain: domainInput,
            role: roleInput,
          }}
          validationSchema={SignupSchema}
        >
          <Form>
            <div className="domain-container">
              <CustomSelect label="Select your Domain:" name="domain">
                <option value="Select your Domain">Select your Domian</option>
                <option value="Designer">Designer</option>
                <option value="development">Developer</option>
                <option value="Product">Product Manager</option>
                <option value="Other">Other</option>
              </CustomSelect>
            </div>
            <div>
              <CustomSelect label="Select your Role:" name="role">
                <option value="Select your Role">Select your Role</option>
                <option value="Entry Level">Entry Level</option>
                <option value="Professional Level">Professional Level</option>
                <option value="Managerial Level">Managerial Level</option>
                <option value="Other">Other</option>
              </CustomSelect>
              <PersistFormikValues name="domain-role" />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
});

export default DomainAndRole;

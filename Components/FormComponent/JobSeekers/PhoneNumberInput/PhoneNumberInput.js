import { Formik, Form, Field, ErrorMessage } from "formik";
import { PersistFormikValues } from "formik-persist-values";
import React, { forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { employeeSignup, getOtp, userLogin } from "services/user";
import * as Yup from "yup";
import CustomField from "../../CustomSelect/CustomField";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SignupSchema = Yup.object().shape({
  number: Yup.string()

    .min(10, "must be 10 characters")
    .max(10, "cant exceed 10 characterss")
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),

  otp: Yup.string().required("Please enter the OTP").max(4, "max 4 characters"),
});

const PhoneNumberInput = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((store) => store.user.login);
  const [otpError, setOtpError] = useState(true);
  const phoneInput = useSelector((store) => store?.user?.userInfo?.phone ?? "");

  const handleOtp = async (number) => {
    let verified = await getOtp(number, isLogin);
    if (verified) {
      setOtpError(false);

      setTimeout(() => {
        setOtpError(true);
      }, 5000);
      return;
    }
  };
  return (
    <div className="custom-form-wrapper">
      <div className="custom-form-top">
        <Formik
          initialValues={{
            number: phoneInput,
            otp: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values) => {
            let value;
            if (isLogin) {
              value = await dispatch(userLogin(values.otp, values.number));

              return value;
            } else {
              value = await dispatch(employeeSignup(values.otp, values.number));

              return value;
            }
          }}
          innerRef={ref}
        >
          {({ setFieldValue, values, errors, touched, validateOnChange }) => (
            <Form>
              <div className="phone-number-parent-wrapper">
                <div className="phone-number-parent">
                  <Field
                    name="number"
                    type="number"
                    component={CustomField}
                    labelName="Enter your phone number"
                    className="short-input"
                    isError={false}
                  />
                  <div
                    className="get-otp button"
                    onClick={() => {
                      handleOtp(values.number);
                    }}
                  >
                    Get OTP
                  </div>
                </div>
                {errors.number ||
                touched.number ||
                values.number.length === 0 ? (
                  <div className="number-warning ">{errors.number}</div>
                ) : null}

                <div className="otp-parent ">
                  <Field
                    name="otp"
                    type="number"
                    component={CustomField}
                    labelName="Verify phone number"
                    className="short-input"
                    maxLength="4"
                  />
                  {}
                  {!errors["otp"] && touched["otp"] && (
                    <div className="otp-image ">
                      <img src="/assets/svgIcons/otp-valid.svg"></img>
                    </div>
                  )}
                </div>
                {!otpError && <div className="otp-message">OTP sent</div>}
              </div>
              <PersistFormikValues ignoreValues="otp" name="phone" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
});

export default PhoneNumberInput;

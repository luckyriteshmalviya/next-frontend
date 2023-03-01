import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { uploadResume } from "services/user";
import { useSelector } from "react-redux";

const SignupSchema = Yup.object().shape({
  file: Yup.string().required("required"),
});

const ResumeInput = forwardRef((props, ref) => {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [message, setMessage] = useState("max file size: 5mb*");
  const resumeInput = useSelector(
    (store) => store?.user?.userInfo?.resume ?? ""
  );

  const createFile = (fileName) => {
    const file = new File(["foo"], `${fileName}`, {
      type: "file",
    });

    return file;
  };

  const inputRef = useRef();

  useEffect(() => {
    if (resumeInput) {
      let updatedFile = createFile(resumeInput);
      setResumeUploaded(true);
    }

    console.log("file created is ");
  }, [resumeInput]);

  return (
    <div className="custom-form-top">
      <Formik
        initialValues={{ file: createFile(resumeInput) }}
        validationSchema={SignupSchema}
        innerRef={ref}
        onSubmit={() => {
          if (!resumeUploaded) {
            setMessage("Please upload the file");
            return false;
          }
          return true;
        }}
      >
        {({ setFieldValue, values, setFieldError, errors }) => (
          <Form>
            <div className="resume-parent">
              <div>
                <div className="label-heading">
                  Upload your resume<sup>*</sup>
                </div>
                <input
                  name="file"
                  type="file"
                  ref={inputRef}
                  id="file"
                  class="file"
                  accept="application/pdf"
                  onChange={async (event) => {
                    event.stopPropagation();
                    let maxVal = 5 * 1024 * 1024;

                    let fileDetails = event.currentTarget.files[0];

                    if (fileDetails?.size > maxVal) {
                      setFieldError(
                        "file",
                        "File size too large! max file size: 5mb*"
                      );
                      return;
                    }

                    await setFieldValue("file", fileDetails);

                    localStorage.setItem(
                      "resume",
                      event.currentTarget?.files[0]?.name ?? ""
                    );
                  }}
                />

                <label for="file">
                  <span>{values?.file ? values?.file?.name : ""}</span>

                  <span
                    className="delete-resume"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      inputRef.current.value = null;
                      setFieldValue("file", "");
                      setResumeUploaded(false);
                    }}
                  >
                    <img src="/assets/svgIcons/deleteResume.svg" />
                  </span>
                </label>
              </div>

              <div
                className="upload-resume button"
                onClick={() => {
                  if (!values.file) {
                    alert("Please enter your resume");
                    return;
                  }
                  let resume = localStorage.getItem("resume");
                  let val;

                  if (resume) {
                    localStorage.removeItem(resume);
                  }

                  val = uploadResume(values.file).then((res) => {
                    if (res) {
                      setResumeUploaded(true);
                      setMessage("File Uploaded ");

                      setTimeout(() => {
                        setMessage("");
                      }, 3000);
                    } else {
                      setMessage("Error");

                      setTimeout(() => {
                        setMessage("");
                      }, 9000);
                    }
                  });
                }}
              >
                UPLOAD
              </div>
            </div>

            {errors["file"] && (
              <div className="form-warning ">{errors["file"]}</div>
            )}

            {message && (
              <div
                className={`${
                  message == "max file size: 5mb*"
                    ? "upload-initial-message"
                    : message == "Error"
                    ? "upload-error-message"
                    : "upload-message"
                }`}
              >
                {message}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
});
export default ResumeInput;

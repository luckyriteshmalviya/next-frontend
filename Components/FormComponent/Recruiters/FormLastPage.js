import { forwardRef } from "react";

const FormLastPage = forwardRef((props, ref) => {
  return (
    <>
      <div className="custom-form-top form-last-page">
        We are revewing your application.
        <br />
        <br />
        We’ll be in touch soon.
        <br /> <br />
        Thank You!
      </div>
    </>
  );
});

export default FormLastPage;

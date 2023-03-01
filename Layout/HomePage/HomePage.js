import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearUserData, setLogin } from "redux/actions/userActions/action";
import { clearLocalData } from "utils/function";
import FooterForGetHired from "../../Components/Footer/FooterForGetHired";
import FooterForHire from "../../Components/Footer/FooterForHire";
import Header from "../../Components/Header/Header";

function HomePage() {
  const [state, setState] = useState("GetHire");
  const [animate, setAnimate] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (animate) {
      setTimeout(() => {
        setAnimate(false);
      }, 3000);
    }
  }, [animate]);

  const changeHireState = (val) => {
    setState(val);
    setAnimate(true);
  };

  const url = state === "Hire" ? "RecruitersForm" : "JobSeekersForm";

  const userLoginHandler = () => {
    router.push("JobSeekersForm");
    localStorage.setItem("savedState", "3");
    dispatch(setLogin(true));
  };

  const userSignUpHandler = () => {
    localStorage.clear();
    dispatch(clearUserData);
    dispatch(setLogin(false));
    router.push(url);
  };

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Mopid</title>
      </Head>

      <div className="homePage">
        <div className="mobileView-homePage-background">
          <img src="/assets/images/mobileBackground.svg" alt="background" />
        </div>
        <div>
          <Header state={state} changeHireState={changeHireState} />
        </div>

        <div className={`homePage-main-container fadein`}>
          <div className="homePage-first-line">The easiest way to</div>
          <div className="homePage-second-line ">
            {state == "Hire" ? (
              <div className="hompage-second-line-hire-text animate">HIRE!</div>
            ) : (
              <div className="hompage-second-line-hired-text animated">
                GET_HIRED!
              </div>
            )}
          </div>
          <div className="homePage-get-started-container">
            <div
              className="homePage-redirectTo-onboarding"
              onClick={userSignUpHandler}
            >
              <button className="homePage-first-button">
                <div className="homePage-first-button-text">GET STARTED</div>
                <img
                  className="homePage-first-button-image"
                  src="assets/images/arrow-right-circle.svg"
                />
              </button>
            </div>
          </div>
          <div className="homepage-already-have-account-container">
            {state === "GetHire" && (
              <div
                className="homePage-first-link"
                state={state}
                onClick={userLoginHandler}
              >
                Already have an account?
              </div>
            )}
          </div>
        </div>
        <div>
          {state === "Hire" ? (
            <FooterForHire animate={animate} />
          ) : (
            <FooterForGetHired animate={animate} />
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;

import "../styles/style.scss";
import "../public/fonts/stylesheet.css";

import { wrapper } from "../redux/store";
import Popup from "Components/Popup/Popup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setRequestResponseInterceptor } from "utils/request";
import { getAuthToken } from "redux/actions/authActions/actions";
import { getUserDetail } from "services/user";

function MyApp({ Component, pageProps }) {
  const popup = useSelector((store) => store.ui.popupId);
  const token = useSelector((store) => store.auth.token);
  const isLogin = useSelector((store) => store.user.login);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRequestResponseInterceptor());
    dispatch(getAuthToken());
  }, []);

  useEffect(() => {
    if (token && isLogin) {
      dispatch(getUserDetail());
    }
  }, [token]);

  return (
    <>
      <Popup isOpen={popup != null} id={popup} type={"center"} />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);

import axios from "axios";

//baseurl
const Request = axios.create({
  baseURL: "https://backend.mopid.me/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * We call this function in Index.js file to initialize interceptors to listen to all the api requests and response
 * going from and coming to out app.
 * The benefits to this implementation is as follows :-
 * 1. Adding authorization tokens to each requests we are making at one  single point (refer to attachTokenInHeader)
 * 2. Adding global loader and maintaining its state using redux. (refer to handleLoaderRequest and handleLoaderResponse)
 * 3. Handling global errors
 *
 * The way loader works is you have to send loder: true through axios request for the api's you want the loader to run for
 * param :- loader = true (default = false)
 * param :- type = 'global' (default = 'local') // defining type tells out code that we donot want our request to automatically cancel
 * when a route changes. This is default behavious for type='local'. Request cancel token is stored inside redux for both global and local
 * requests. token is removed from array once an api request finishes. all the api's(local) will be canceled using the cancel token
 * stored in reduc if user changes the route to stop the loaders. Global request willl not be cancelled and will keep on going until a response
 * is recieved. One the array is empty loader will automatically stop.
 * @param {*} dispatch
 *
 */
export const setRequestResponseInterceptor = () => (dispatch, getState) => {
  Request.interceptors.request.use(
    (request) => {
      attachTokenInHeader(request, getState().auth.token);
      return request;
    },
    (error) => {
      return error;
    }
  );

  Request.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        // dispatch(logout());
      }
      return error;
    }
  );
};

/**
 * This function attaches token to the request
 * @param {*} Request
 * @param {*} token
 */
const attachTokenInHeader = (Request, token) => {
  token && (Request.headers.Authorization = token);
};

export default Request;

//  await formikProps.setValues(newValues);

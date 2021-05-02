import axios from "axios";
import getConfig from "next/config";
import { MAIN_URL } from "./types";
import { getCookies } from "../actions/commonActions";
import { auth } from "firebase";
import https from "https";

//onst { publicRuntimeConfig } = getConfig();
const { REACT_APP_STAGE } = "development";

export const getToken = () => localStorage.getItem("edAuthToken");
export const getSecureToken = () => localStorage.getItem("edSecureToken");

let BASE_URL = MAIN_URL;

// switch(REACT_APP_STAGE){
//     case 'production':
//       BASE_URL = 'http://3.16.157.225:1337/'
//       break;
//     case 'staging':

//      BASE_URL = 'http://52.14.110.244:1337/'
//       break;
//    case 'development':
//       BASE_URL = 'http://localhost:1337/'
//       break;
//     default:
//       BASE_URL = 'http://localhost:1337/'
//       break;
// }

// Set config defaults when creating the instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

// axiosInstance.interceptors.response.use(
//     response => {
//         return response
//     },
//     error => {
//         if(error.response){
//             if (error.response.status === 500) {
//                 initializeStore().dispatch(handleLoader(false));
//             }
//             else if (error.response.status === 403) {
//                 initializeStore().dispatch(handleLoader(false));
//             }
//             else if (error.response.status === 404) {
//                 initializeStore().dispatch(handleLoader(false));
//             }
//             else if (error.response.status === 400) {
//                 initializeStore().dispatch(handleLoader(false));
//             }
//             else if (error.response.status === 401) {
//                 initializeStore().dispatch(handleLoader(false));
//             }
//             else if (error.response.status === 409) {
//                 initializeStore().dispatch(handleLoader(false));
//             }
//         }
//         return Promise.reject(error);
//     }
// )

export const setAuthorizationToken = () => {
  var langOwn = document.cookie.match(
    "(^|;)\\s*" + "langOwn" + "\\s*=\\s*([^;]+)"
  );
  langOwn = langOwn ? langOwn.pop() : "";
  if (langOwn) {
    axiosInstance.defaults.headers.common["langOwn"] = langOwn;
  }
  var authtoken = document.cookie.match(
    "(^|;)\\s*" + "authtoken" + "\\s*=\\s*([^;]+)"
  );
  authtoken = authtoken ? authtoken.pop() : "";
  if (authtoken) {
    axiosInstance.defaults.headers.common["jwt"] = authtoken;
  }
  var userId = document.cookie.match(
    "(^|;)\\s*" + "userId" + "\\s*=\\s*([^;]+)"
  );
  userId = userId ? userId.pop() : "";
  if (userId) {
    axiosInstance.defaults.headers.common["userid"] = userId;
  }
  var latitude = document.cookie.match(
    "(^|;)\\s*" + "latitude" + "\\s*=\\s*([^;]+)"
  );
  latitude = latitude ? latitude.pop() : "";
  if (latitude) {
    axiosInstance.defaults.headers.common["latitude"] = latitude;
  }
  var longitude = document.cookie.match(
    "(^|;)\\s*" + "longitude" + "\\s*=\\s*([^;]+)"
  );
  longitude = longitude ? longitude.pop() : "";
  if (longitude) {
    axiosInstance.defaults.headers.common["longitude"] = longitude;
  }
};

// Send a POST request
export const postRequest = (url, data) => {
  setAuthorizationToken();
  return axiosInstance({
    method: "post",
    url,
    data,
  });
};

// Send a GET request
export const getRequest = (url) => {
  setAuthorizationToken();
  return axiosInstance({
    method: "get",
    url,
  });
};

// Send a DELETE request
export const deleteRequest = (url) => {
  setAuthorizationToken();
  return axiosInstance({
    method: "delete",
    url,
  });
};

// Send a PUT request
export const putRequest = (url, data) => {
  setAuthorizationToken();
  return axiosInstance({
    method: "put",
    url,
    data,
  });
};

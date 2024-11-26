import API_URLS from "@/configs/URLs";
import axios from "axios";

export default function AuthInterceptor(logout: any) {
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      // if (error.response.status === 305 && user) {
      //   logout("You have been blocked by the admin");
      if (
        error.response.status == 401 &&
        error.config.url !== API_URLS + "userLogout"
      ) {
        return Promise.reject(
          logout("You have been logout due to session expiry!")
        );
      } else {
        return Promise.reject(error);
      }
    }
  );
}

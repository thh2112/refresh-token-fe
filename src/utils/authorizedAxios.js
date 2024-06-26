// Author: HuyHoangDev
import axios from "axios";
import { refreshTokenAPI } from "~/apis/index";
const axiosClient = axios.create();

axiosClient.defaults.timeout = 1000 * 60 * 5;
axiosClient.defaults.withCredentials = true;

axiosClient.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);


axiosClient.interceptors.response.use(
  (response) => {
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  },
  (error) => {
    const originRequest = error.config;
    if (error.response?.status === 410 && !originRequest._retry) {
      originRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
        return refreshTokenAPI(refreshToken)
          .then((res) => {
            const accessToken = res.data?.accessToken
            localStorage.setItem("accessToken", accessToken);
            axiosClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
            return axiosClient(originRequest);
          })
          .catch((err) => {
            // remove data in local storage and redirect to login page
            location.href = "/login";
          })
    }

    return Promise.reject(error);
  },
);

export default axiosClient;

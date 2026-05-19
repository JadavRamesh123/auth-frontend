import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem("accessToken");

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;
  },

  (error) => {

    return Promise.reject(error);

  }
);


api.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      try {

        const refreshToken =
          localStorage.getItem("refreshToken");

        if (!refreshToken) {

          localStorage.removeItem("accessToken");

          localStorage.removeItem("refreshToken");

          window.location.href = "/login";

          return Promise.reject(error);
        }

        const res = await axios.post(
          "http://localhost:3000/refreshToken",
          {
            refreshToken,
          }
        );

        const newAccessToken =
          res.data.accessToken;

        localStorage.setItem(
          "accessToken",
          newAccessToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (refreshError) {

        localStorage.removeItem("accessToken");

        localStorage.removeItem("refreshToken");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
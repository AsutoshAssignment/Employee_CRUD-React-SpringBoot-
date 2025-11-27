import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080",  
});

// Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend sends 401 → Unauthenticated
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized — logging out user");

      localStorage.removeItem("token");

      window.location.href = "/login"; // redirect
    }

    return Promise.reject(error);
  }
);

export default axiosClient;

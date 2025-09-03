import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://68b89d9db71540504328bb0a.mockapi.io/api", 
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;

import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "https://laundryhubvn.com/api",
});

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    console.log("run interceptor");
    // Do something before request is sent
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    // toast.error()
    return Promise.reject(error);
  }
);

export default api;

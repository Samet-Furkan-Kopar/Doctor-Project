import axios from "axios";
import { servicePath } from "../utils/defaultValues";

const axiosInstance = axios.create({
  baseURL: servicePath,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");

  const configEl = config;
  configEl.params = configEl.params || {};
  configEl.headers = {
    Authorization: `Bearer ${token}`,
    accept: "application/json",
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-cache",
  };
  return configEl;
});

export default axiosInstance;

import axios from "axios";
import { servicePath } from "../utils/defaultValues";
import { getUserToken } from "../utils/auth";
const axiosAuth = axios.create({
  baseURL: servicePath,
});

axiosAuth.interceptors.request.use((config) => {
  const configEl = config;
  configEl.params = configEl.params || {};
  const token = getUserToken();
  console.log("token : ", token);
  configEl.headers = {
    // Authorization: `Bearer ${token}`,
    accept: "application/json",
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-cache",
  };
  return configEl;
});

export default axiosAuth;

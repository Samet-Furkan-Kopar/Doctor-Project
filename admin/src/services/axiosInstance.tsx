import axios from "axios";
import { getUserToken } from "../utils/Auth";
import { servicePath } from "../utils/Constants";


const axiosInstance = axios.create({
  baseURL: servicePath,
});


axiosInstance.interceptors.request.use((config: any) => {
  const configEl = config;
  configEl.params = configEl.params || {};
  const token = getUserToken();
  configEl.headers = {
    Authorization: `Bearer ${token}`,
    'accept': 'application/json',
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
    "Cache-Control": "no-cache",
  };
  return configEl;
});

export default axiosInstance;

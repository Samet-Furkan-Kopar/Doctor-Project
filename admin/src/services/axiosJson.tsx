import axios from "axios";
import { getUserToken } from "../utils/Auth";
import { servicePath } from "../utils/Constants";



const axiosJSON = axios.create({
  baseURL: servicePath,
});


axiosJSON.interceptors.request.use((config: any) => {
  const configEl = config;
  configEl.params = configEl.params || {};
  const token = getUserToken();
  configEl.headers = {
    Authorization: `Bearer ${token}`,
    'accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    "Cache-Control": "no-cache",
  };
  return configEl;
});

export default axiosJSON;

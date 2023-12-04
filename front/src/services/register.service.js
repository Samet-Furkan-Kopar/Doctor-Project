import axios from "./axiosInstance";
import {  logoutFromSystem } from "../utils/auth";

const addNewAdvisor = async (data) => {
  const mall = await axios({
    method: "POST",
    url: `/user/register/officeuser`,
    data: data,
  })
    .then((response) => response)
    .catch((error) => error);
  return mall;
};

const getAdvisorType = async () => {
  const mall = await axios({
    method: "GET",
    url: `/advisortype`,
  })
    .then((response) => response)
    .catch((error) => error);
  return mall;
};

const RegisterService = {
  addNewAdvisor,
  getAdvisorType,
};

export default RegisterService;

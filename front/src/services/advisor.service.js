import axios from "./axiosInstance";
import Swal from "sweetalert2";
import {  logoutFromSystem } from "../utils/auth";

const getAdvisorList = async (query) => {
  let Query = "";

  if (query) {
    Query = Object.keys(query)
      .map((val, k) => k > 0 ? `&${val}=${query[val]}` : `?${val}=${query[val]}`)
      .join("");
  }
  const res = await axios({
    method: "GET",
    url: "/user/advisor-list" + Query,
  })
    .then((response) => response)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return res;
};

const deleteAdvisor = async (id) => {
  const res = await axios({
    method: "DELETE",
    url: `/user/${id}`,
  })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return res;
};

export const advisorService = {
  getAdvisorList,
  deleteAdvisor,
};

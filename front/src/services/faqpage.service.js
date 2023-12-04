import axios from "./axiosInstance";
import Swal from "sweetalert2";
import {  logoutFromSystem } from "../utils/auth";

const getContent = async () => {
  let res = await axios({
    method: "GET",
    url: "/page/faq",
  })
    .then((res) => res)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return res?.data;
};



const faqPageServices = {
  getContent,
};

export default faqPageServices;

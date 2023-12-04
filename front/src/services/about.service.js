import axios from "./axiosInstance";
import Swal from "sweetalert2";
import {  logoutFromSystem } from "../utils/auth";

const getBanner = async () => {
  let res = await axios({
    method: "GET",
    url: "/content/about/banner",
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

const getAbout = async () => {
    let res = await axios({
      method: "GET",
      url: "/content/about/about",
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

  const getSeo = async () => {
    let res = await axios({
      method: "GET",
      url: "/content/about/seo",
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
const aboutServices = {
    getBanner,
    getAbout,
    getSeo
  };
  
  export default aboutServices;
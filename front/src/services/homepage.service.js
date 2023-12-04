import axios from "./axiosInstance";
import Swal from "sweetalert2";
import {  logoutFromSystem } from "../utils/auth";

const getHomepageContent = async () => {
  let res = await axios({
    method: "GET",
    url: "/page/homepage",
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
const getCity = async () => {
  let res = await axios({
    method: "GET",
    url: "/location",
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
const getDistricts = async (id) => {
  let res = await axios({
    method: "GET",
    url: `/location/${id}`,
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

const getAdvertShape = async (id) => {
  let res = await axios({
    method: "GET",
    url: `/advertshape/${id}`,
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

const getNewsList = async () => {
  let res = await axios({
    method: "POST",
    url: "brand/news",
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

const getBlogsList = async () => {
  let res = await axios({
    method: "POST",
    url: "brand/blogs",
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

const getBlogDetail = async (id) => {
  let res = await axios({
    method: "POST",
    url: `brand/blogdetail/${id}`,
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

const getSuccessfulUsersList = async () => {
  let res = await axios({
    method: "POST",
    url: "brand/successfullusers",
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

const getCustomerCommentsList = async () => {
  let res = await axios({
    method: "POST",
    url: "customercomment/getlist",
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

const homePageServices = {
  getHomepageContent,
  getNewsList,
  getBlogsList,
  getBlogDetail,
  getSuccessfulUsersList,
  getCustomerCommentsList,
  getCity,
  getDistricts,
  getAdvertShape,
};

export default homePageServices;

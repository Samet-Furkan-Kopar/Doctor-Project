import axios from "./axiosInstance";
import Swal from "sweetalert2";
import {  logoutFromSystem } from "../utils/auth";

const getMasterList = async (
  currentPage = 1,
  selectedPageSize = "",
  search = ""
) => {
  const person = await axios({
    method: "GET",
    url: `/managers?paginate=${selectedPageSize}&page=${currentPage}&searchKey=${search}`,
  })
    .then((response) => response)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return person?.data;
};
const addNewMaster = async (info) => {
  const product = await axios({
    method: "POST",
    url: `/managers`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return product;
};
const updateUserMaster = async (info, id) => {
  const product = await axios({
    method: "PUT",
    url: `/managers/${id}`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return product;
};
const userMasterDelete = async (id) => {
  const product = await axios({
    method: "DELETE",
    url: `/managers/${id}`,
  })
    .then((response) => response)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return product;
};
const getUserList = async (
  currentPage = 1,
  selectedPageSize = "",
  search = ""
) => {
  const mall = await axios({
    method: "GET",
    url: `/users?paginate=${selectedPageSize}&page=${currentPage}&searchKey=${search}`,
  })
    .then((response) => response)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return mall?.data;
};
const addNewUser = async (info) => {
  const mall = await axios({
    method: "POST",
    url: `/users`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return mall;
};
const getUserDetail = async (id) => {
  const user = await axios({
    method: "GET",
    url: `/users/${id}`,
  })
    .then((response) => response)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return user;
};
const updateUser = async (info, id) => {
  const mall = await axios({
    method: "POST",
    url: `/users/${id}`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return mall;
};
const userToggleStatus = async (id) => {
  const mall = await axios({
    method: "GET",
    url: `/users/toggle/${id}`,
  })
    .then((response) => response)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return mall;
};
const userDelete = async (id) => {
  const mall = await axios({
    method: "DELETE",
    url: `/users/${id}`,
  })
    .then((response) => response)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return mall;
};
const postContactMsg = async (data) => {
  const mall = await axios({
    method: "POST",
    url: `/incoming`,
    data: data,
  })
    .then((response) => response)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return mall;
};
const getUserOfficesList = async (
  page = "",
  paginate = "",
  searchKey = "",
  startDate = "",
  endDate = ""
) => {
  const mall = await axios({
    method: "GET",
    url: `/user/office-list?page=${page}&paginate=${paginate}&searchKey=${searchKey}&startDate=${startDate}&endDate=${endDate}`,
  })
    .then((response) => response?.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
};
const advertContactWithAgent = async (data) => {
  const mall = await axios({
    method: "POST",
    url: `/usercontactform`,
    data: data,
  })
    .then((response) => response)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return mall;
};

const getOneUserWithId = async () => {
  const mall = await axios({
    method: "GET",
    url: `/user/detail`,
  })
    .then((response) => response.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return mall;
};

const updateOneUserWithId = async (data) => {
  const mall = await axios({
    method: "PUT",
    url: `/user/update`,
    data: data,
  })
    .then((response) => response.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return mall;
};

const restartPassword = async (data) => {
  const mall = await axios({
    method: "PUT",
    url: `/user/update-password`,
    data: data,
  })
    .then((response) => response.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return mall;
};

const masterServices = {
  restartPassword,
  updateOneUserWithId,
  getOneUserWithId,
  getMasterList,
  getUserList,
  addNewMaster,
  addNewUser,
  updateUserMaster,
  updateUser,
  userMasterDelete,
  userDelete,
  userToggleStatus,
  getUserDetail,
  postContactMsg,
  getUserOfficesList,
  advertContactWithAgent,
};
export default masterServices;

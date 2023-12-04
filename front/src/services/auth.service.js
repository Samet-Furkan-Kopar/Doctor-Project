import { converFormData } from "../utils/converFormData";
import axios from "./axiosAuth";
import axiosInstance from "./axiosInstance";
import Swal from "sweetalert2";
import { logoutFromSystem } from "../utils/auth";

const addIndividualUser = async (data) => {
  const fd = converFormData(data);
  for (const entry of fd.entries()) {
    console.log(entry[0], entry[1]);
  }

  const res = await axios({
    method: "POST",
    url: "/user/individual",
    data: fd,
  })
    .then((response) => response.data)
    .catch((error) => {
      return error.response.data.message;
    });
  return res;
};

const addDoctorUser = async (data) => {
  console.log("Kurumsal kullanıcı kaydına girdi");
  const fd = converFormData(data);
  const res = await axios({
    method: "POST",
    url: "/user/doctor",
    data: fd,
  })
    .then((response) => response.data)
    .catch((error) => {
      if (error?.response?.status == 401) {
        logoutFromSystem()
      } else {
        return error;
      }
    });
  return res;
};

const login = async (data) => {
  const fd = converFormData(data);

  let res = await axios({
    method: "POST",
    url: "/user/login",
    data: fd,
  })
    .then((response) => response.data)
    .catch((error) => {
      return error.response.data.message;
    });
  return res;
};


const logout = async () => {

  let res = await axiosInstance({
    method: "GET",
    url: "/user/logout",
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log('KKK', error)
      if (error?.response?.status == 401) {
        localStorage.removeItem("current_user");
        localStorage.removeItem("userToken");
        location.replace('/')
      } else {
        return error;
      }
    });
  return res;
};
const getDoctorCategoryList = async () => {
  const res = await axios({
    method: "GET",
    url: `/user-role`,
  })
    .then((res) => res.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        localStorage.removeItem("current_user");
        localStorage.removeItem("userToken");
        location.replace('/')
      }else{
        return error;
      }
    });
  return res;
}


const authServices = {
  addIndividualUser,//bireysel kullnıcı
  addDoctorUser,
  login,
  logout,
  getDoctorCategoryList
};

export default authServices;

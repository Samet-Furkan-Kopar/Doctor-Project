import Swal from "sweetalert2";
import axios from "./axiosInstance";
import {  logoutFromSystem } from "../utils/auth";

const getPageSeoData = async (page) => {
  const res = await axios({
    method: "GET",
    url: `/content/${page}`,
  })
    .then((response) => response.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return res;
}

const setSubscriberData = async (data) => {
  const res = await axios({
    method: "POST",
    url: `/subscription`,
    data
  })
    .then((response) => response.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return res;
}

const getCountryList = async () => {
  const res = await axios({
    method: "GET",
    url: "/location/country",
  })
    .then((response) => response.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return res;
};


const getCityList = async (id) => {
  const res = await axios({
    method: "GET",
    url: `/location/city/${id}`,
  })
    .then((response) => response.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return res;
};

const getDistrictList = async (id) => {
  const res = await axios({
    method: "GET",
    url: `/location/district/${id}`,
  })
    .then((response) => response.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return res;
};

const getNeighbourhoodList = async (id) => {
  const res = await axios({
    method: "GET",
    url: `/location/neighbourhood/${id}`,
  })
    .then((response) => response.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return res;
};

const getGeneralSettings = async () => {
  const res = await axios({
    method: "GET",
    url: `/systemsetting`,
  })
    .then((response) => response.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return res;
};

const dashboardData = async () => {
  const data = await axios({
    method: "GET",
    url: `/user/dashboard`,
  })
    .then((response) => response.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return data;
};

const getUserList = async () => {
  const data = await axios({
    method: "GET",
    url: `user-list`,
  })
    .then((response) => response.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return data;
};

const getUserListWithTime = async (
  currentPage = 1,
  selectedPageSize = "",
  timeStamp = ""
) => {
  const products = await axios({
    method: "GET",
    url: `/user-list?paginate=${selectedPageSize}&page=${currentPage}&timeStamp=${timeStamp}`,
  })
    .then((response) => response)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return products?.data;
};

const getPaymentListWithTime = async (
  currentPage = 1,
  selectedPageSize = "",
  timeStamp = ""
) => {
  const products = await axios({
    method: "GET",
    url: `/payment-list?paginate=${selectedPageSize}&page=${currentPage}&timeStamp=${timeStamp}`,
  })
    .then((response) => response)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return products?.data;
};

const getPaymentList = async () => {
  const res = await axios({
    method: "GET",
    url: `payment-list`,
  })
    .then((response) => response.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return res;
};

const getUserPaymentList = async (
  currentPage = 1,
  selectedPageSize = "",
  userId = ""
) => {
  const settings = await axios({
    method: "GET",
    url: `/users/payment-list?paginate=${selectedPageSize}&page=${currentPage}&userId=${userId}`,
  })
    .then((response) => response)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return settings?.data;
};

const getWithdrawList = async () => {
  const res = await axios({
    method: "GET",
    url: `withdraw-list`,
  })
    .then((response) => response.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return res;
};

const getBalanceValue = async () => {
  const res = await axios({
    method: "GET",
    url: `balance`,
  })
    .then((response) => response.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return res;
};

const addSetting = async (info) => {
  const product = await axios({
    method: "POST",
    url: `/settings`,
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

const updateSetting = async (info) => {
  const mall = await axios({
    method: "PUT",
    url: `/settings`,
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

const updatePaymentStatus = async (info, id) => {
  const mall = await axios({
    method: "POST",
    url: `/payments/toggle/${id}`,
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

const getCurrencyList = async () => {
  const res = await axios({
    method: "GET",
    url: "/currency",
  })
    .then((response) => response.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return res;
};

const getProvinceList = async () => {
  const res = await axios({
    method: "GET",
    url: `/location`,
  })
    .then((response) => response.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return res;
};

const generalServices = {
  getDistrictList,
  dashboardData,
  getUserList,
  getPaymentList,
  getCurrencyList,
  getWithdrawList,
  getGeneralSettings,
  addSetting,
  updateSetting,
  updatePaymentStatus,
  getUserPaymentList,
  getBalanceValue,
  getUserListWithTime,
  getPaymentListWithTime,
  getCityList,
  getProvinceList,
  getCountryList,
  getNeighbourhoodList,
  getPageSeoData,
  setSubscriberData
};

export default generalServices;

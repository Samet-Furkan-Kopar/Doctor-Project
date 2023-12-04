import Swal from "sweetalert2";
import axios from "./axiosInstance";
import {  logoutFromSystem } from "../utils/auth";

const officeAllData = async () => {
  const res = await axios({
    method: "GET",
    url: `/user/office-getall`,
  }).then((response) => response.data)
    .catch((error) => {
      if (error?.response?.status == 401) {
        logoutFromSystem()
      } else {
        return error;
      }
    });
  return res;
};

const officeResponse = async (page, paginate) => {
  const res = await axios({
    method: "GET",
    url: `/user/office-list?page=${page}&paginate=${paginate}`,
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

const officeDetail = async (id) => {
  const res = await axios({
    method: "GET",
    url: `/office/detail/${id}`,
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
const officeDetailTeam = async (id) => {
  const res = await axios({
    method: "GET",
    url: `/user/advisor-list/${id}`,
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

const sendOfficeContactForm = async (
  officeId,
  name,
  email,
  subject,
  phoneNumber,
  message
) => {
  const response = await axios.post("/officecontactform", {
    officeId,
    name,
    email,
    subject,
    phoneNumber,
    message,
  }).then((response) => response.data)
    .catch((error) => {
      if (error?.response?.status == 401) {
        logoutFromSystem()
      } else {
        return error;
      }
    });
  return response;
};
const officeAdvertResponse = async (id, page, paginate) => {
  const res = await axios({
    method: "GET",
    url: `/user/officeadvert-list/${id}?page=${page}&paginate=${paginate}`,
  }).then((response) => response.data)
    .catch((error) => {
      if (error?.response?.status == 401) {
        logoutFromSystem()
      } else {
        return error;
      }
    });
  return res;
};

const filterOfficeData = async (
  officeCountryId,
  officeCityId,
  officeDistrictId,
  searchKey
) => {
  const url = `/office/filter?officeCountryId=${officeCountryId}&officeCityId=${officeCityId}&officeDistrictId=${officeDistrictId}&searchKey=${searchKey}`;

    const res = await axios({
      method: "GET",
      url: url,
    }).then((response) => response.data)
    .catch((error) => {
      if (error?.response?.status == 401) {
        logoutFromSystem()
      } else {
        return error;
      }
    });
  return res;;
};


const officeData = {
  officeAllData,
  officeResponse,
  officeDetail,
  officeDetailTeam,
  sendOfficeContactForm,
  officeAdvertResponse,
  filterOfficeData
};

export default officeData;
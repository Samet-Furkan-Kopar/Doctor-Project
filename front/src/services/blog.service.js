import axios from "./axiosInstance";
import Swal from "sweetalert2";
import {  logoutFromSystem } from "../utils/auth";

const blogDetail = async (id) => {
  const res = await axios({
    method: "GET",
    url: `/blog/${id}`,
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

const blogsResponse = async (page, paginate, searchKey) => {
  const res = await axios({
    method: "GET",
    url: `/blog/get-list?page=${page}&paginate=${paginate}&searchKey=${searchKey}`,
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
const blogDataResponse = async (searchKey) => {
  const res = await axios({
    method: "GET",
    url: `/blog/get-list?searchKey=${searchKey}`,
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

const blogData = {
  blogDetail,
  blogsResponse,
  blogDataResponse,
};

export default blogData;

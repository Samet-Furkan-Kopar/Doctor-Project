import axios from "./axiosInstance";
import Swal from "sweetalert2";
import { logoutFromSystem } from "../utils/auth";

const getFilterSideBar = async (val, location) => {
  const mall = await axios({
    method: "POST",
    url: `/page/doctor-key`,
    data: val,
  })
    .then((response) => response)
    .catch((error) => {
      if (error?.response?.status == 401) {
        logoutFromSystem()
      } else {
        return error;
      }
    });
  return mall;
  // if (!val && !location) {
  //   const mall = await axios({
  //     method: "POST",
  //     url: `/page/filter-sidebar`,
  //   })
  //     .then((response) => response)
  //     .catch((error) => {
  //       if (error?.response?.status == 401) {
  //         logoutFromSystem()
  //       } else {
  //         return error;
  //       }
  //     });
  //   return mall;
  // } else if (val && !location) {
  //   const mall = await axios({
  //     method: "POST",
  //     url: `/page/filter-sidebar`,
  //     data: { advertTypeId: val },
  //   })
  //     .then((response) => response)
  //     .catch((error) => {
  //       if (error?.response?.status == 401) {
  //         logoutFromSystem()
  //       } else {
  //         return error;
  //       }
  //     });
  //   return mall;
  // } else if (!val && location) {
  //   const mall = await axios({
  //     method: "POST",
  //     url: `/page/filter-sidebar`,
  //     data: { advertTypeId: val, ...location },
  //   })
  //     .then((response) => response)
  //     .catch((error) => {
  //       if (error?.response?.status == 401) {
  //         logoutFromSystem()
  //       } else {
  //         return error;
  //       }
  //     });
  //     return mall;
  // }


};

const getFilterSideBarBlog = async (val, location) => {
  const mall = await axios({
    method: "POST",
    url: `/page/blog-key`,
    data: val,
  })
    .then((response) => response)
    .catch((error) => {
      if (error?.response?.status == 401) {
        logoutFromSystem()
      } else {
        return error;
      }
    });
  return mall;


};


export default {
  getFilterSideBar,
  getFilterSideBarBlog
};

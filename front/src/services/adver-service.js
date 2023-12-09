import { converFormData } from "../utils/converFormData";
import axios from "./axiosInstance";
import Swal from "sweetalert2";
import { logoutFromSystem } from "../utils/auth";

const getAdvertTypes = async () => {
  const res = await axios({
    method: "GET",
    url: "/advertype",
    data: null,
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

const getProcessType = async () => {
  const res = await axios({
    method: "GET",
    url: `/processtype`,
    data: null,
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

const getAdvertShapes = async (id) => {
  const res = await axios({
    method: "GET",
    url: `/advertshape/${id}`,
    data: null,
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


const updateAdvert = async (data, id) => {
  const fd = new FormData();
  Object.entries(data).map(([key, value]) => {
    if (key != 'coverPhoto' && key != 'advertPhoto') {
      if (!key.includes("_isStatus")) {
        if (data[`${key}_isStatus`]) {
          fd.append(key, JSON.stringify([{
            text: value,
            isStatus: data[`${key}_isStatus`]
          }]))
        } else {
          fd.append(key, value)
        }

      }

    } else if (key == 'coverPhoto') {
      if(typeof value != 'string'){
        fd.append('coverPhoto', value[0])
      }
    } else if (key == 'advertPhoto') {
      if (value?.length > 0) {
        value.map((v, ind) => {
          fd.append(`image_${ind + 1}`, v)
        })
      }
    }
  });

  const token = localStorage.getItem("userToken");

  const res = await axios({
    method: "PUT",
    url: `/advert/advert-update/${id}`,
    data: fd,
    headers: { Authorization: `Bearer ${token}` },
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
const updateBlog = async (data, id) => {
  const fd = new FormData();
  Object.entries(data).map(([key, value]) => {
    if (key != 'coverPhoto' && key != 'advertPhoto') {
      if (!key.includes("_isStatus")) {
        if (data[`${key}_isStatus`]) {
          fd.append(key, JSON.stringify([{
            text: value,
            isStatus: data[`${key}_isStatus`]
          }]))
        } else {
          fd.append(key, value)
        }

      }

    } else if (key == 'coverPhoto') {
      if(typeof value != 'string'){
        fd.append('coverPhoto', value[0])
      }
    } else if (key == 'advertPhoto') {
      if (value?.length > 0) {
        value.map((v, ind) => {
          fd.append(`image_${ind + 1}`, v)
        })
      }
    }
  });

  const token = localStorage.getItem("userToken");

  const res = await axios({
    method: "PUT",
    url: `/blog/${id}`,
    data: fd,
    headers: { Authorization: `Bearer ${token}` },
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

const addBlog = async (data) => {
  const fd = new FormData();
  Object.entries(data).map(([key, value]) => {
    if (key != 'coverPhoto' && key != 'blogPhoto') {
      if (!key.includes("_isStatus")) {
        if (data[`${key}_isStatus`]) {
          fd.append(key, JSON.stringify([{
            text: value,
            isStatus: data[`${key}_isStatus`]
          }]))
        } else {
          fd.append(key, value)
        }

      }

    } else if (key == 'coverPhoto') {
      fd.append('coverPhoto', value[0])
    } else if (key == 'blogPhoto') {
      if (value?.length > 0) {
        value.map((v, ind) => {
          fd.append(`image_${ind + 1}`, v)
        })
      }
    }
  });

  const token = localStorage.getItem("userToken");

  const res = await axios({
    method: "POST",
    url: "/blog",
    data: fd,
    headers: { Authorization: `Bearer ${token}` },
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


const getAllAdverts = async () => {
  const token = localStorage.getItem("userToken");
  const res = await axios({
    method: "GET",
    url: `/advert`,
    data: undefined,
    headers: { Authorization: `Bearer ${token}` },
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

const getAllAdvertList = async (sorting = '', currentPage = '', search = "") => {
  const token = localStorage.getItem("userToken");
  const res = await axios({
    method: "GET",
    url: `/user/adverts-list?sorting=${sorting}&page=${currentPage}&searchKey=${search}`,
    data: undefined,
    headers: { Authorization: `Bearer ${token}` },
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
const getAllBlogList = async (sorting = '', currentPage = '', search = "") => {
  const token = localStorage.getItem("userToken");
  const res = await axios({
    method: "GET",
    url: `/blog/user-blog?sorting=${sorting}&page=${currentPage}&searchKey=${search}`,
    data: undefined,
    headers: { Authorization: `Bearer ${token}` },
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

const getAdvertWithNo = async (id) => {
  const token = localStorage.getItem("userToken");
  const res = await axios({
    method: "POST",
    url: `/advert/${id}`,
    headers: { Authorization: `Bearer ${token}` },
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

const deleteAdvert = async (id) => {
  const res = await axios({
    method: "DELETE",
    url: `/advert/${id}`,
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
const deleteBlog = async (id) => {
  const res = await axios({
    method: "DELETE",
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
const deleteAppointment = async (id) => {
  const res = await axios({
    method: "DELETE",
    url: `/appointment/${id}`,
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

const getAppointmentList = async () => {
  const res = await axios({
    method: "GET",
    url: `/appointment/patient-list`,
  })
    .then((res) => res.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });

  return res;
};
const getDoctorAppointmentList = async () => {
  const res = await axios({
    method: "GET",
    url: `/appointment/doctor-list`,
  })
    .then((res) => res.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });

  return res;
};

// advertType ıd lazım
const getFeaturesWithId = async (id) => {
  const res = await axios({
    method: "GET",
    url: `/subtitleoffeature/get-list/${id}`,
  })
    .then((res) => res.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });

  return res;
};

const toggleStatus = async (id) => {
  const res = await axios({
    method: "GET",
    url: `/advert/change-status/${id}`,
  })
    .then((res) => res.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });

  return res;
};
const blogToggleStatus = async (id) => {
  const res = await axios({
    method: "GET",
    url: `/blog/toggle-status${id}`,
  })
    .then((res) => res.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });

  return res;
};

const duplicateAdvert = async (id) => {
  const res = await axios({
    method: "GET",
    url: `/advert/advert-copy/${id}`,
  })
    .then((res) => res.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });

  return res;
};

const getFavoriteAdverts = async (sorting = '', currentPage = '', search = "") => {
  const token = localStorage.getItem("userToken");
  const res = await axios({
    method: "GET",
    url: `/favorite?sorting=${sorting}&page=${currentPage}&searchKey=${search}`,
    data: undefined,
    headers: { Authorization: `Bearer ${token}` },
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

const setFavoriteAdvert = async (id) => {
  const res = await axios({
    method: "POST",
    url: `/favorite/${id}`,
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

const getAdvertTypeInputs = async (id) => {
  const res = await axios({
    method: "GET",
    url: `/advert/advert-key/${id}`,
  })
    .then((res) => res.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });

  return res;
};

const getAdvertDetails = async (id) => {
  const res = await axios({
    method: "GET",
    url: `/advert/detail/${id}`,
  })
    .then((res) => res.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return res;
};
const getBlogDetails = async (id) => {
  const res = await axios({
    method: "GET",
    url: `/blog/${id}`,
  })
    .then((res) => res.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return res;
};


const getSubUserList = async (id) => {
  const res = await axios({
    method: "GET",
    url: `/advert/advertiser-subusers/${id}`,
  })
    .then((res) => res.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });

  return res;
};

const changeAdvertOwner = async (id, data) => {
  const res = await axios({
    method: "PUT",
    url: `/advert/advertiser-subusers/${id}`,
    data
  })
    .then((res) => res.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return res;
};


const getVIPLinkList = async (sorting = '', currentPage = '', search = "") => {
  const token = localStorage.getItem("userToken");
  const res = await axios({
    method: "GET",
    url: `/viplink/getlist?sorting=${sorting}&page=${currentPage}&searchKey=${search}`,
    headers: { Authorization: `Bearer ${token}` },
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

const deleteVIPLink = async (id) => {
  const res = await axios({
    method: "DELETE",
    url: `/viplink/${id}`,
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

const getUserAdvertList = async () => {
  const res = await axios({
    method: "GET",
    url: `/viplink/advert-list`,
  })
    .then((res) => res.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });

  return res;
}



const createVipLink = async (data) => {
  const token = localStorage.getItem("userToken");
  const res = await axios({
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    url: `/viplink`,
    data
  })
    .then((res) => res.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });

  return res;
};

const checkAdvertClick = async (id) => {
  const res = await axios({
    method: "GET",
    url: `/advert/advertclick/${id}`,
  })
    .then((res) => res.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return res;
}
const deleteAdvertImage = async (id, photoId) => {
  const res = await axios({
    method: "DELETE",
    url: `/advert/photodelete/${id}/${photoId}`,
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

const toggleAdvertImageStatus = async (data, id) => {
  const token = localStorage.getItem("userToken");
  const res = await axios({
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    url: `/advert/photoupdate/${id}`,
    data
  })
    .then((res) => res.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });

  return res;
};

const getRejectMessage = async (id) => {
  const res = await axios({
    method: "GET",
    url: `/rejectedadvert/${id}`,
  })
    .then((res) => res.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return res;
}



const advertServices = {
  getRejectMessage,
  updateAdvert,
  addBlog,//
  getBlogDetails,//
  updateBlog,//
  getAllBlogList,//
  blogToggleStatus,//
  deleteBlog,//
  getAppointmentList,//
  getDoctorAppointmentList,//
  deleteAppointment,//
  deleteAdvert,
  getAdvertTypes,
  getProcessType,
  getAdvertShapes,
  getFeaturesWithId,
  getAllAdverts,
  getAdvertWithNo,
  getAllAdvertList,
  toggleStatus,
  duplicateAdvert,
  getFavoriteAdverts,
  setFavoriteAdvert,
  getAdvertTypeInputs,
  getAdvertDetails,
  getSubUserList,
  changeAdvertOwner,
  getVIPLinkList,
  deleteVIPLink,
  getUserAdvertList,
  createVipLink,
  checkAdvertClick,
  deleteAdvertImage,
  toggleAdvertImageStatus
};

export default advertServices;

import Swal from "sweetalert2";
import authServices from "../services/auth.service";

export const getCurrentUser = () => {
  let user = null;
  try {
    user =
      localStorage.getItem("current_user") != null
        ? JSON.parse(localStorage.getItem("current_user") || "{}")
        : null;
  } catch (error) {
    console.log(">>>>: src/helpers/Utils.js  : getCurrentUser -> error", error);
    user = null;
  }
  return user;
};

export const getUserToken = () => {
  let token;
  if (localStorage.getItem("userToken")) {
    token = localStorage.getItem("userToken");
  }
  return token;
};

export const setCurrentUser = (user) => {
  if (user) {
    localStorage.setItem("current_user", JSON.stringify(user));
  } else {
    localStorage.removeItem("current_user");
  }
};


export const logoutFromSystem = () => {
  authServices.logout().then(res => {
    Swal.fire({ title: 'Oturumunuzun Süresi Doldu Lütfen Giriş Yapınız!', text: '', icon: 'error', customClass: 'sweet-alerts' });
    localStorage.removeItem("current_user");
    localStorage.removeItem("userToken");
    location.replace('/login')
  })
};

export const setPresentationStatus = (status) => {
  if (status) {
    localStorage.setItem("presentation_status", JSON.stringify({status}));
  } else {
    localStorage.setItem("presentation_status", JSON.stringify({status: false}));
  }
};

export const getPresentationStatus = () => {
  let user = null;
  try {
    user =
      localStorage.getItem("presentation_status") != null
        ? JSON.parse(localStorage.getItem("presentation_status") || "{}")
        : null;
  } catch (error) {
    console.log(">>>>: src/helpers/Utils.js  : getPresentationStatus -> error", error);
    user = null;
  }
  return user;
};

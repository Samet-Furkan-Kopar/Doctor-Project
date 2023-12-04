import axios from "./axiosInstance";
import Swal from "sweetalert2";
import { logoutFromSystem } from "../utils/auth";

const getSiteFormMessages = async () => {
  let res = await axios({
    method: "GET",
    url: "/officecontactform",
  })
    .then((res) => res)
    .catch((error) => {
      if (error?.response?.status == 401) {
        logoutFromSystem()
      } else {
        return error;
      }
    });
  return res?.data;
};


const conversationServices = {
  getSiteFormMessages,
};

export default conversationServices;
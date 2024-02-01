import axiosInstance from './axiosInstance';
import axiosJSON from './axiosJson';

const getDashboardData = async () => {
  const courses = await axiosJSON({
    method: 'GET',
    url: `/user/user-count`,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return courses?.data;
};





const dashboardServices = {
  getDashboardData,

};

export default dashboardServices;

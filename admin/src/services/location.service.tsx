import axiosInstance from './axiosInstance';
import axiosJSON from './axiosJson';

const getCountryList = async () => {
  const ibans = await axiosJSON({
    method: 'GET',
    url: `/location`,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return ibans?.data;
};

const getCityList = async (id: string) => {
  const ibans = await axiosJSON({
    method: 'GET',
    url: `/location/city/${id}`,
  })
    .then((response) => response.data)
    .catch((error) => (console.log(error)));
  return ibans;
};

const getDistrictList = async (id: string) => {
  const ibans = await axiosJSON({
    method: 'GET',
    url: `/location/district/${id}`,
  })
    .then((response) => response.data)
    .catch((error) => (console.log(error)));
  return ibans;
};

const getNeighbourhoodList = async (id: string) => {
  const ibans = await axiosJSON({
    method: 'GET',
    url: `/location/neighbourhood/${id}`,
  })
    .then((response) => response.data)
    .catch((error) => (console.log(error)));
  return ibans;
};



const locationServices = {
  getCountryList,
  getCityList,
  getDistrictList,
  getNeighbourhoodList

};

export default locationServices;

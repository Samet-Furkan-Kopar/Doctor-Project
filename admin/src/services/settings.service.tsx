import axiosInstance from './axiosInstance';
import axiosJSON from './axiosJson';

const getEmailSetting = async () => {
  const game = await axiosJSON({
    method: 'GET',
    url: `/emailsetting`,
  })
    .then((response) => response.data)
    .catch((error) => (console.log(error)));
  return game;
};


const emailSettingAdd = async (info: object) => {
  const course = await axiosJSON({
    method: 'POST',
    url: `/emailsetting`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return course;
};


const getSmsSetting = async () => {
  const game = await axiosJSON({
    method: 'GET',
    url: `/smssetting`,
  })
    .then((response) => response.data)
    .catch((error) => (console.log(error)));
  return game;
};


const smsSettingAdd = async (info: object) => {
  const course = await axiosJSON({
    method: 'POST',
    url: `/smssetting`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return course;
};

const getIyzicoSetting = async () => {
  const game = await axiosJSON({
    method: 'GET',
    url: `/iyzicosetting`,
  })
    .then((response) => response.data)
    .catch((error) => (console.log(error)));
  return game;
};


const iyzicoSettingAdd = async (info: object) => {
  const course = await axiosJSON({
    method: 'POST',
    url: `/iyzicosetting`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return course;
};

const getBunnynetPhotoSetting = async () => {
  const game = await axiosJSON({
    method: 'GET',
    url: `/bunnyphoto`,
  })
    .then((response) => response.data)
    .catch((error) => (console.log(error)));
  return game;
};

const bunnynetPhotoSettingAdd = async (info: object) => {
  const course = await axiosInstance({
    method: 'POST',
    url: `/bunnyphoto`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return course;
};

const getBunnynetVideoSetting = async () => {
  const game = await axiosJSON({
    method: 'GET',
    url: `/bunnyvideo`,
  })
    .then((response) => response.data)
    .catch((error) => (console.log(error)));
  return game;
};


const bunnynetVideoSettingAdd = async (info: object) => {
  const course = await axiosInstance({
    method: 'POST',
    url: `/bunnyvideo`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return course;
};

const getSystemSetting = async () => {
  const game = await axiosJSON({
    method: 'GET',
    url: `/systemsetting`,
  })
    .then((response) => response.data)
    .catch((error) => (console.log(error)));
  return game;
};


const systemSettingAdd = async (info: any) => {
  const course = await axiosInstance({
    method: 'POST',
    url: `/systemsetting`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return course;
};

const getParasutSetting = async () => {
  const game = await axiosJSON({
    method: 'GET',
    url: `/api/v1/parasut`,
  })
    .then((response) => response.data)
    .catch((error) => (console.log(error)));
  return game;
};


const parasutSettingAdd = async (info: any) => {
  const course = await axiosJSON({
    method: 'POST',
    url: `/api/v1/parasut`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return course;
};

const getZoomSetting = async () => {
  const game = await axiosJSON({
    method: 'GET',
    url: `/api/v1/zoomsettingkey`,
  })
    .then((response) => response.data)
    .catch((error) => (console.log(error)));
  return game;
};

const zoomSettingAdd = async (info: any) => {
  const course = await axiosJSON({
    method: 'POST',
    url: `/api/v1/zoomsettingkey`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return course;
};



const getCertificateSetting = async () => {
  const game = await axiosJSON({
    method: 'GET',
    url: `/api/v1/certificate`,
  })
    .then((response) => response.data)
    .catch((error) => (console.log(error)));
  return game;
};

const getCertificatePreview = async () => {
  const pdf = await axiosJSON({
    method: 'GET',
    url: `/api/v1/certificate/preview`,
    responseType: "blob"
  })
    .then((response) => response)
    .catch((error) => (console.log(error)));
  return pdf;
};


const certificateSettingAdd = async (info: any) => {
  const course = await axiosInstance({
    method: 'POST',
    url: `/api/v1/certificate`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return course;
};

const getChatGPTSetting = async () => {
  const game = await axiosJSON({
    method: 'GET',
    url: `/chatgptsettingkey`,
  })
    .then((response) => response.data)
    .catch((error) => (console.log(error)));
  return game;
};

const chatGPTSettingAdd = async (info: any) => {
  const course = await axiosInstance({
    method: 'POST',
    url: `/chatgptsettingkey`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return course;
};

const getGoogleMapSetting = async () => {
  const game = await axiosJSON({
    method: 'GET',
    url: `/googlemap`,
  })
    .then((response) => response.data)
    .catch((error) => (console.log(error)));
  return game;
};

const googleMapSettingAdd = async (info: any) => {
  const course = await axiosInstance({
    method: 'POST',
    url: `/googlemap`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return course;
};



const restartAdminPassword = async (info: any) => {
  const course = await axiosJSON({
    method: 'PUT',
    url: `/admin/restartpassword`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return course;
};



const settingsServices = {
  getEmailSetting,
  emailSettingAdd,
  getSmsSetting,
  smsSettingAdd,
  getIyzicoSetting,
  iyzicoSettingAdd,
  getBunnynetPhotoSetting,
  bunnynetPhotoSettingAdd,
  getBunnynetVideoSetting,
  bunnynetVideoSettingAdd,
  getSystemSetting,
  systemSettingAdd,
  getParasutSetting,
  parasutSettingAdd,
  getZoomSetting,
  zoomSettingAdd,
  getCertificateSetting,
  certificateSettingAdd,
  getChatGPTSetting,
  chatGPTSettingAdd,
  getCertificatePreview,
  restartAdminPassword,
  getGoogleMapSetting,
  googleMapSettingAdd
};

export default settingsServices;

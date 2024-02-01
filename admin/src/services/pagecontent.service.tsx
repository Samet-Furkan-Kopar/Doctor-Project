import axiosInstance from './axiosInstance';
import axiosJSON from './axiosJson';

const getPageDetail = async (page: string, type: string) => {//diğer get isteklerinde kullanabiliriz bunu
  const game = await axiosJSON({
    method: 'GET',
    url: `/content/${page}/${type}`,
  })
    .then((response) => response.data)
    .catch((error) => (console.log(error)));
  return game;
};


const updateContent = async (info: any) => {
    console.log(info)
  const category = await axiosInstance({
    method: 'POST',
    url: `/content`,
    data: info
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return category;
};

const pagecontentServices = {
  getPageDetail,
  updateContent,
};

export default pagecontentServices;

import axiosInstance from './axiosInstance';
import axiosJSON from './axiosJson';

const getCategoryList = async (
  currentPage: number = 1,
  selectedPageSize: number = 10,
  search: string = ''
) => {
  const faqs = await axiosJSON({
    method: 'GET',
    url: `/api/v1/footer-categories?paginate=${selectedPageSize}&page=${currentPage}&searchKey=${search}`,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return faqs?.data;
};

const getCategoryListAll = async () => {
  const faqs = await axiosJSON({
    method: 'GET',
    url: `/api/v1/footer-categories/all`,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return faqs?.data;
};

const addCategory = async (info: any) => {
  const faq = await axiosJSON({
    method: 'POST',
    url: `/api/v1/footer-categories`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return faq;
};

const updateCategory = async (info: object, id: string) => {
  const faq = await axiosJSON({
    method: 'PUT',
    url: `/api/v1/footer-categories/${id}`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return faq;
};


const deleteCategory = async (id: string) => {
  const faq = await axiosJSON({
    method: 'DELETE',
    url: `/api/v1/footer-categories/${id}`,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return faq;
};

const getCategoryDetail = async (
  id: string,
  currentPage: number = 1,
  selectedPageSize: number = 10,
  search: string = ''
  ) => {
  const faq = await axiosJSON({
    method: 'GET',
    url: `/api/v1/footer-categories/${id}?paginate=${selectedPageSize}&page=${currentPage}&searchKey=${search}`,
  })
    .then((response) => response.data)
    .catch((error) => (console.log(error)));
  return faq;
};

const reorderCategory = async (id: string, info:Object) => {
  const category = await axiosJSON({
    method: 'PUT',
    url: `/api/v1/footer-categories/re-order/${id}`,
    data: info
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return category;
};

const addLink = async (info: any, id: string) => {
  const faq = await axiosJSON({
    method: 'POST',
    url: `/api/v1/footer-categories/create-link/${id}`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return faq;
};

const updateLink = async (info: object, id: string) => {
  const faq = await axiosJSON({
    method: 'PUT',
    url: `/api/v1/footer-categories/update-link/${id}`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return faq;
};

const deleteLink = async (id: string) => {
  const faq = await axiosJSON({
    method: 'DELETE',
    url: `/api/v1/footer-categories/delete-link/${id}`,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return faq;
};

const reorderLink = async (id: string, info:Object) => {
  const category = await axiosJSON({
    method: 'PUT',
    url: `/api/v1/footer-categories/reorder-link/${id}`,
    data: info
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return category;
};



const footerManagementServices = {
  getCategoryList,
  getCategoryListAll,
  addCategory,
  updateCategory,
  deleteCategory,
  getCategoryDetail,
  reorderCategory,
  addLink,
  updateLink,
  deleteLink,
  reorderLink



};

export default footerManagementServices;

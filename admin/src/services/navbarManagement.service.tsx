import axiosJSON from './axiosJson';

const getLinkList = async (
  currentPage: number = 1,
  selectedPageSize: number = 10,
  search: string = ''
) => {
  const faqs = await axiosJSON({
    method: 'GET',
    url: `/api/v1/navbar-links?paginate=${selectedPageSize}&page=${currentPage}&searchKey=${search}`,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return faqs?.data;
};

const addLink = async (info: any) => {
  const faq = await axiosJSON({
    method: 'POST',
    url: `/api/v1/navbar-links`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return faq;
};

const updateLink = async (info: object, id: string) => {
  const faq = await axiosJSON({
    method: 'PUT',
    url: `/api/v1/navbar-links/${id}`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return faq;
};

const deleteLink = async (id: string) => {
  const faq = await axiosJSON({
    method: 'DELETE',
    url: `/api/v1/navbar-links/${id}`,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return faq;
};

const reorderLink = async (id: string, info:Object) => {
  const category = await axiosJSON({
    method: 'PUT',
    url: `/api/v1/navbar-links/re-order/${id}`,
    data: info
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return category;
};

const navbarManagementServices = {
  getLinkList,
  addLink,
  updateLink,
  deleteLink,
  reorderLink
};

export default navbarManagementServices;

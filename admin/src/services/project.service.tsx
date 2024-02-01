import axiosInstance from './axiosInstance';
import axiosJSON from './axiosJson';









const getProjectDetail = async (id: string) => {
  const blog = await axiosInstance({
    method: 'GET',
    url: `/admin/project-detail-user/${id}`,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return blog;
};



const deleteProject = async (id: string) => {
  const advertType = await axiosJSON({
    method: 'DELETE',
    url: `/project/${id}`,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return advertType;
};

//manager user advert list
const getUserProjectListAll = async (
  currentPage: number = 1,
  selectedPageSize: number = 10,
  search: string = '',
  searchStartDate: string = '',
  searchEndDate: string = '',
  id: string = '',
) => {
  const advertTypes = await axiosJSON({
    method: 'GET',
    url: `/admin/project-list-user/${id}?paginate=${selectedPageSize}&page=${currentPage}&searchKey=${search}&startDate=${searchStartDate}&endDate=${searchEndDate}`,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return advertTypes?.data;
};










const toggleAdvertStatus = async (id: string) => {
  const vipLink = await axiosInstance({
    method: 'PUT',
    url: `/admin/advert-toggle-status/${id}`,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return vipLink;
};
const getSubEnterpriseToolList = async (
  currentPage: number = 1,
  selectedPageSize: number = 10,
  search: string = '',

  id: string = ''
) => {
  const users = await axiosJSON({
    method: 'GET',
    url: `/admin/tool-list-user/${id}?paginate=${selectedPageSize}&page=${currentPage}&searchKey=${search}`,//
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return users?.data;
};

const deleteTool = async (id: string) => {
  const tool = await axiosJSON({
    method: 'DELETE',
    url: `/tool/${id}`,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return tool;
};
const updateTool = async (info: any, id: string) => {
  const resources = await axiosInstance({
    method: 'PUT',
    url: `/tool/${id}`,
    data: info
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return resources;
};
const getSubEnterpriseToolDetail = async (
  id: string = ''
) => {
  const get = await axiosJSON({
    method: 'GET',
    url: `/tool/detail/${id}`,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return get?.data;
};
const createTool = async (info: any, id: string) => {
  const result = await axiosInstance({
    method: 'POST',
    url: `/admin/tool-user/${id}`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return result;
};
const getToolsList = async (id: string) => {
  const tools = await axiosJSON({
    method: 'GET',
    url: `/admin/tool-getall-user/${id}`,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return tools?.data;
};
const getToolTrackingList = async (
  currentPage: number = 1,
  selectedPageSize: number = 10,
  search: string = '',
  searchStartDate: string = '',
  searchEndDate: string = '',
  id: string
  ) => {
  const toolTracking = await axiosJSON({
    method: 'GET',
    url: `/admin/tool-tracking-list-user/${id}`,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return toolTracking;
};
const createResource = async (info: any, id: string) => {
  const result = await axiosInstance({
    method: 'POST',
    url: `/admin/resources-user/${id}`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return result;
};
const deleteResource = async (id: string) => {
  const tool = await axiosJSON({
    method: 'DELETE',
    url: `/resources/${id}`,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return tool;
};
const updateResource = async (info: any, id: string) => {
  const resources = await axiosInstance({
    method: 'PUT',
    url: `/resources/${id}`,
    data: info
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return resources;
};
const getResourceTrackingList = async (
  currentPage: number = 1,
  selectedPageSize: number = 10,
  search: string = '',
  searchStartDate: string = '',
  searchEndDate: string = '',
  id: string
  ) => {
  const toolTracking = await axiosJSON({
    method: 'GET',
    url: `/admin/resources-tracking-list-user/${id}`,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return toolTracking;
};
const getSubEnterpriseResourceDetail = async (
  id: string = ''
) => {
  const get = await axiosJSON({
    method: 'GET',
    url: `/resources/detail/${id}`,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return get?.data;
};
const getSubEnterpriseResourceList = async (
  currentPage: number = 1,
  selectedPageSize: number = 10,
  search: string = '',
  id: string = ''
) => {
  const users = await axiosJSON({
    method: 'GET',
    url: `/admin/resources-list-user/${id}?paginate=${selectedPageSize}&page=${currentPage}&searchKey=${search}`,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return users?.data;
};
const getResourcesList = async (id: string) => {
  const resource = await axiosJSON({
    method: 'GET',
    url: `/admin/resources-getall-user/${id}`,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return resource?.data;
};

const getEmployeesList = async (id: string) => {
  const employees = await axiosJSON({
    method: 'GET',
    url: `/admin/getall-employees/${id}`,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return employees?.data;
};
const getCustomerList = async (id: string) => {
  const customers = await axiosJSON({
    method: 'GET',
    url: `/admin/customer-getall-user/${id}`,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return customers?.data;
};
const addProject = async (info: any, id: string) => {

  console.log("servicede");

  const project = await axiosInstance({
    method: 'POST',
    url: `/admin/project-create-user/${id}`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return project;
};
const updateProjectData = async (info: any, id: string) => {
  const user = await axiosInstance({
    method: 'PUT',
    url: `/project/${id}`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => error?.response?.data);
  return user;
};
const advertServices = {
  getCustomerList,
  getEmployeesList,
  getToolsList,
  getResourcesList,
  addProject,
  updateProjectData,
 
  getProjectDetail,
  deleteProject,
  getUserProjectListAll,

  toggleAdvertStatus,

 

  getSubEnterpriseToolList,
  deleteTool,
  updateTool,
  getSubEnterpriseToolDetail,
  createTool,
  getToolTrackingList,

  getSubEnterpriseResourceList,
  deleteResource,
  updateResource,
  getResourceTrackingList,
  
  getSubEnterpriseResourceDetail,
  createResource
};

export default advertServices;

import axiosInstance from './axiosInstance';
import axiosJSON from './axiosJson';

const getManagerUserList = async (
    currentPage: number = 1,
    selectedPageSize: number = 10,
    search: string = ''
) => {
    const users = await axiosJSON({
        method: 'GET',
        url: `/admin/doctor-list?paginate=${selectedPageSize}&page=${currentPage}&searchKey=${search}`,
    })
        .then((response) => response)
        .catch((error) => error?.response?.data);
    return users?.data;
};

const getDoctorList = async (
    currentPage: number = 1,
    selectedPageSize: number = 10,
    search: string = ''
) => {
    const users = await axiosJSON({
        method: 'GET',
        url: `/admin/doctor-getall?paginate=${selectedPageSize}&page=${currentPage}&searchKey=${search}`,
    })
        .then((response) => response)
        .catch((error) => error?.response?.data);
    return users?.data;
};
const getUserList = async (
    currentPage: number = 1,
    selectedPageSize: number = 10,
    search: string = ''
) => {
    const users = await axiosJSON({
        method: 'GET',
        url: `/admin/user-getall?paginate=${selectedPageSize}&page=${currentPage}&searchKey=${search}`,
    })
        .then((response) => response)
        .catch((error) => error?.response?.data);
    return users?.data;
};
//alt kullanıcıları listele
const getSubEnterpriseUserList = async (
    currentPage: number = 1,
    selectedPageSize: number = 10,
    search: string = '',
    id: string = ''
) => {
    const users = await axiosJSON({
        method: 'GET',
        url: `/admin/getlist-employees/${id}?paginate=${selectedPageSize}&page=${currentPage}&searchKey=${search}`,
    })
        .then((response) => response)
        .catch((error) => error?.response?.data);
    return users?.data;
};




const updateUserData = async (info: any, id: string) => {
    const user = await axiosInstance({
        method: 'PUT',
        url: `/admin/update-user/${id}`,
        data: info,
    })
        .then((response) => response)
        .catch((error) => error?.response?.data);
    return user;
};

//kullandık
const getUserDetail = async (id: string) => {
    const user = await axiosJSON({
        method: 'GET',
        url: `/admin/detail-user/${id}`,
    })
        .then((response) => response)
        .catch((error) => error?.response?.data);
    return user;
};


const userDelete = async (id: string) => {
    const user = await axiosJSON({
        method: 'DELETE',
        url: `/admin/user-delete/${id}`,
    })
        .then((response) => response)
        .catch((error) => error?.response?.data);
    return user;
};
const confirmDoctor = async (id: string) => {
    const user = await axiosJSON({
        method: 'GET',
        url: `/admin/confirm-doctor/${id}`,
    })
        .then((response) => response)
        .catch((error) => error?.response?.data);
    return user;
};


//alt kullanıcı eklmeme managerId ile
const storeSubUser = async (info: any,id:string) => {
    const user = await axiosInstance({
        method: 'POST',
        url: `/admin/register-employees/${id}`,
        data: info,
    })
        .then((response) => response)
        .catch((error) => error?.response?.data);
    return user;
};

const storeManagerUser = async (info: any) => {
    console.log("servicede");

    const user = await axiosInstance({
        method: 'POST',
        url: `/admin/register-manager`,
        data: info,
    })
        .then((response) => response)
        .catch((error) => error?.response?.data);
    return user;
};



//roler listesi
const getUserRoleList = async (id:string) => {
    const users = await axiosJSON({
        method: 'GET',
        url: `/admin/role-list-user/${id}`,
    })
        .then((response) => response)
        .catch((error) => error?.response?.data);
    return users?.data;
};











const changeUserStatus = async (info: any, id: string) => {
    const user = await axiosInstance({
        method: 'POST',
        url: `/admin/user-approval/${id}`,
        data: info,
    })
        .then((response) => response)
        .catch((error) => error?.response?.data);
    return user;
};






//kullandık
const getUserRecourseList = async (
    currentPage: number = 1,
    selectedPageSize: number = 10,
    search: string = '',
    id: string
) => {
    const get = await axiosJSON({
        method: 'GET',
        url: `/admin/recourse-list-user/${id}?paginate=${selectedPageSize}&page=${currentPage}&searchKey=${search}`,
    })
        .then((response) => response)
        .catch((error) => error?.response?.data);
    return get;
};
//kullandık
const getUserWorkingHourseList = async (
    currentPage: number = 1,
    selectedPageSize: number = 10,
    search: string = '',
    id: string
) => {
    const get = await axiosJSON({
        method: 'GET',
        url: `/admin/userworkinghourse-list-user/${id}?paginate=${selectedPageSize}&page=${currentPage}&searchKey=${search}`,
    })
        .then((response) => response)
        .catch((error) => error?.response?.data);
    return get;
};
//kullandık
const deleteResource = async (id: string) => {
    const remove = await axiosJSON({
        method: 'DELETE',
        url: `/admin/recourse/${id}`,
    })
        .then((response) => response)
        .catch((error) => error?.response?.data);
    return remove;
};

const userServices = {
    getManagerUserList,//kullanıyoruz
    storeManagerUser,//kullanıyoruz
    updateUserData,
    userDelete,
    getSubEnterpriseUserList,
    storeSubUser,


    getUserDetail,//kullanıyoruz bireyselkullanıcı detay
    getUserRoleList,
    changeUserStatus,

    getUserRecourseList,
    deleteResource,
    confirmDoctor,
    getUserWorkingHourseList,
    getUserList,
    getDoctorList
};

export default userServices;

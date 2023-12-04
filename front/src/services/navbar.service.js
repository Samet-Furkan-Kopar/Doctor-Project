import axios from './axiosInstance';
import Swal from "sweetalert2";
import {  logoutFromSystem } from "../utils/auth";

const getGamesList = async (
  currentPage = 1,
  selectedPageSize = '',
  search = ''
) => {
  const games = await axios({
    method: 'GET',
    url: `/navbar?paginate=${selectedPageSize}&page=${currentPage}&searchKey=${search}`,
  })
    .then((response) => response)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return games?.data;
};

const getGameDetail = async (id) => {
  const game = await axios({
    method: 'GET',
    url: `/navbar/${id}`,
  })
    .then((response) => response.data)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return game;
};


const addGame = async (info) => {
  const game = await axios({
    method: 'POST',
    url: `/navbar`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return game;
};

const updateGame = async (info, id) => {
  const game = await axios({
    method: 'POST',
    url: `/navbar/${id}`,
    data: info,
  })
    .then((response) => response)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return game;
};

const gameDelete = async (id) => {
  const game = await axios({
    method: 'DELETE',
    url: `/navbar/${id}`,
  })
    .then((response) => response)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return game;
};

const gameToggleStatus = async (id) => {
  const game = await axios({
    method: 'GET',
    url: `/navbar/toggle/${id}`,
  })
    .then((response) => response)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return game;
};

const gameListReorder = async (id, order) => {
  const game = await axios({
    method: 'GET',
    url: `/navbar/order/${id}/${order}`,
  })
    .then((response) => response)
    .catch((error) => {
      if(error?.response?.status == 401) {
        logoutFromSystem()
      }else{
        return error;
      }
    });
  return game;
};

const navbarServices = {
  getGamesList,
  getGameDetail,
  addGame,
  updateGame,
  gameDelete,
  gameToggleStatus,
  gameListReorder
};

export default navbarServices;

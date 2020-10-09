import axios from "./Axios";

const get = (id) => {
  return axios.get(`/item-stocks/${id}`);
};

const getAll = (store) => {
      return axios.get(`/item-stocks?size=5&stockStore.in=${store}`);
};

const getLowAll = (store, value) => {
  return axios.get(
    `/item-stocks?size=5&stockStore.in=${store}&totalQuantity.lessThanOrEqual=${value}`
  );
};

const count = (store) => {
  return axios.get(`/item-stocks/count?stockStore.in=${store}`);
};

const add = (data) => {
  return axios.post(`/item-stocks/`, data);
};

export default {
  get,
  getAll,
  count,
  getLowAll,
  add,
};

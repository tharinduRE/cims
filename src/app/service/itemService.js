import axios from "./Axios";

const get = (id) => {
  return axios.get(`/item-stocks/${id}`);
};

/* const sendAPIrequest = async (request) => {
  try {
    const res = await request;
    console.log(res);
  } catch (err) {
     console.log(err)
  }
} */

const getAll = (store) => {
      return axios.get(`/item-stocks?size=5&stockStore.in=${store}`);
};

const getLowAll = (store, value) => {
  return axios.get(
    `/item-stocks?size=5&stockStore.in=${store}&tot alQuantity.lessThanOrEqual=${value}`
  );
};

const count = (store) => {
  return axios.get(`/item-stocks/count?stockStore.in=${store}`);
};

const add = (data) => {
  return axios.post(`/item-stocks/`, data);
};

const deleteOne = (id) => {
  return axios.delete(`/item-stocks/${id}`)
}

const update = (data) => {
  return axios.put(`/item-stocks/`,data)
}


export default {
  get,
  getAll,
  count,
  getLowAll,
  add,
  deleteOne,
  update,
};

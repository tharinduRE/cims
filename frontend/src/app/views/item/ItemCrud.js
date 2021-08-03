import fetchApi from "../../service/Axios";

const get = (id) => {
  return fetchApi.get(`/items/${id}`);
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
  return fetchApi.get(`/items?size=5&stockStore.in=${store}`);
};

const getById = (id) => {
  return fetchApi.get(`/items/${id}`);
};

const getLowAll = (store, value) => {
  return fetchApi.get(
    `/items/low?page=1&size=5`
  );
};

const count = (store) => {
  return fetchApi.get(`/items/count?stockStore.in=${store}`);
};

const add = (data) => {
  return fetchApi.post(`/items/`, data);
};

const deleteOne = (id) => {
  return fetchApi.delete(`/items/${id}`);
};

const update = (data) => {
  return fetchApi.put(`/items/`, data);
};

const itemsCrud = {
  get,
  getAll,
  count,
  getLowAll,
  add,
  deleteOne,
  update,
  getById
};
export default itemsCrud;

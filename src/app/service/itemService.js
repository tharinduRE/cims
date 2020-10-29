import fetchApi from "./Axios";

const get = (id) => {
  return fetchApi.get(`/item-stocks/${id}`);
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
  return fetchApi.get(`/item-stocks?size=5&stockStore.in=${store}`);
};

const getLowAll = (store, value) => {
  return fetchApi.get(
    `/item-stocks?size=5&stockStore.in=${store}&tot alQuantity.lessThanOrEqual=${value}`
  );
};

const count = (store) => {
  return fetchApi.get(`/item-stocks/count?stockStore.in=${store}`);
};

const add = (data) => {
  return fetchApi.post(`/item-stocks/`, data);
};

const deleteOne = (id) => {
  return fetchApi.delete(`/item-stocks/${id}`);
};

const update = (data) => {
  return fetchApi.put(`/item-stocks/`, data);
};

const methods = {
  get,
  getAll,
  count,
  getLowAll,
  add,
  deleteOne,
  update,
};
export default methods;

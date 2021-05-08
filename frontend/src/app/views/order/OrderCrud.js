import fetchApi from "../../service/Axios";

const create = (payload) => {
    return fetchApi.post(`/orders`,payload);
}

const methods = {
    create,
}

export default methods;

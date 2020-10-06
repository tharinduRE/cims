import axios from './Axios';

const get = (id) => {
    return axios.get(`/item-stocks/${id}`);
}

const getAll = () => {
    return axios.get(`/item-stocks/`)
}

export default  {
    get,
    getAll,
}

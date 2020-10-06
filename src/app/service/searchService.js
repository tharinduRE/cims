import axios from './Axios';

const search = (q) => {
    return axios.get(`http://localhost:8080/api/_search/item-stocks?query=${q}`)
}

export default {
    search,
}
import axios from './Axios';

const searchByName = (q) => {
    return axios.get(`/item-stocks?itemName.contains=${q}`)
}

const searchByCAS = (q) => {
    return axios.get(`/item-stocks?casNumber.equals=${q}`)
}

const methods = {
    searchByName,
    searchByCAS
}

export default methods;
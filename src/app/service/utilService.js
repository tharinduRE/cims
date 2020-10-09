import axios from './Axios';

const getMeasUnits = () => {
    return axios.get(`meas-units`)
}

export default {
    getMeasUnits,
}
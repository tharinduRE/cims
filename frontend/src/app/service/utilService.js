import axios from './Axios';

const getMeasUnits = () => {
    return axios.get(`meas-units`);
}

const methods = {
    getMeasUnits,
}

export default methods;
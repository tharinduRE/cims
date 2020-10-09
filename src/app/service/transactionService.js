import axios from './Axios';

const getAllIssues = (pageSize) => {
    return axios.get(`item-transactions?size=${pageSize}&transactionType.in=ISSUE`);
}

export default {
    getAllIssues,
}
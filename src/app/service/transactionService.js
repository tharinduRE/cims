import axios from './Axios';

const getAllIssues = (pageSize) => {
    return axios.get(`item-transactions?size=${pageSize}&sort=transactionDate,desc&transactionType.in=ISSUE`);
}

const postTransaction = (data) => {
    return axios.post(`/item-transactions`,data);
}

export default {
    getAllIssues,
    postTransaction,
}
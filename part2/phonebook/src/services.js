import axios from "axios";
const baseURL = "http://127.0.0.1:3001/persons";

const getAll = () => {
    return axios.get(baseURL).then((res) => res.data);
};
const createPerson = (personObject) => {
    return axios.post(baseURL, personObject).then((res) => res.data);
};

const updatePerson = (id, personObject) => {
    return axios.put(`${baseURL}/${id}`, personObject).then((res) => res.data);
};

const personServices = { getAll, createPerson, updatePerson };
export default personServices;

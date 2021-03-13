import axios from "axios";
const baseURL = "/api/persons";

const getAll = () => {
    return axios.get(baseURL).then((res) => res.data);
};
const createPerson = (personObject) => {
    return axios.post(baseURL, personObject).then((res) => res.data);
};

const updatePerson = (personObject, newPhoneNumber) => {
    return axios
        .put(`${baseURL}/${personObject.id}`, {
            ...personObject,
            phoneNumber: newPhoneNumber,
        })
        .then((res) => res.data);
};

const deletePerson = (id) => {
    return axios.delete(`${baseURL}/${id}`);
};

const personServices = { getAll, createPerson, updatePerson, deletePerson };
export default personServices;

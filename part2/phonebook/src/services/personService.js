import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch((error) => alert(error));
};

const create = (newObject) => {
  return axios
    .post(baseUrl, newObject)
    .then((response) => response.data)
    .catch((error) => alert(error));
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).catch((error) => alert(error));
};

const update = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data)
    .catch((error) => alert(error));
};

export default { getAll, create, remove, update };

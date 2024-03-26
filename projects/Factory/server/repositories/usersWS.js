const axios = require('axios');

const URL = 'https://jsonplaceholder.typicode.com/users';

const getAllUsers =() =>{
  return axios.get(URL);
}

const getUserById = (id) => {
  return axios.get(`${URL}/${id}`);
};

const getUserByUsername = (username) => {
  return axios.get(`${URL}?username=${username}`);
};

module.exports = { getAllUsers,getUserById,getUserByUsername };

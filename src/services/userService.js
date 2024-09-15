import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("api/login", { email: userEmail, password: userPassword });
};

const getAllUsers = (userId) => {
  return axios.get(`api/get-all-users?id=${userId}`);
};

export { handleLoginApi, getAllUsers };

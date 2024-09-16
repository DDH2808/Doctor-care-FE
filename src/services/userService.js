import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getAllUsers = (userId) => {
  return axios.get(`/api/get-all-users?id=${userId}`);
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
}

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId
    }
  });
}

export { handleLoginApi, getAllUsers, createNewUserService, deleteUserService };

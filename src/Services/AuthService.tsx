import axios from "axios";
import { error } from "console";
import { removeUser } from "../Slices/UserSlice";
const base_url = "https://jobsy-backend-xeog.onrender.com/auth/";

const loginUser = async (login: any) => {
  return axios
    .post(`${base_url}login`, login)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

const navigateToLogin = (navigate: any) => {
  localStorage.removeItem("token");
  removeUser();
  navigate("/login");
};

export { loginUser };

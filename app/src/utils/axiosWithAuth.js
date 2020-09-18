import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: "https://bw-how-2.herokuapp.com",
    headers: {
      Authorization: token,
    },
  });
};

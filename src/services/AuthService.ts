import { baseApi } from "../api/apiClient";

const login = async (username: string, password: string) => {
  const res = await baseApi.post('/token/', {
    username,
    password
  });

  return res.data;
}


export default {
  login,
}
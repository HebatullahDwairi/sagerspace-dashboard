import { api } from "./apiClient";

export const login = async (data : { username: string, password: string }) => {
  try {
    const res = await api.post('/token/', data);

    localStorage.setItem('accessToken', res.data.access);
  }
  catch(e) {
    console.log(e);
  }
}
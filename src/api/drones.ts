import { api } from "./apiClient";

export  const getAllDrones = async () => {
  try {
    const res = await api.get('/drones/');
    return res.data;
  }
  catch (e) {
    console.log(e); 
  }
}

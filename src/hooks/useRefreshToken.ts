import { useCallback } from "react";
import { api } from "../api/apiClient";

const useRefreshToken = () => {
  const refresh = useCallback(async () => {
    try {
      const res = await api.post('/token/refresh/');
      return res.data.access;
    }
    catch (err) {
      console.log(err);
    }
  }, []);

  return refresh;
}

export default useRefreshToken;
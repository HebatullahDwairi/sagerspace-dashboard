import { useCallback } from "react";
import { baseApi } from "../api/apiClient";

const useRefreshToken = () => {
  const refresh = useCallback(async () => {
      const res = await baseApi.post('/token/refresh/');
      return res.data.access;
  }, []);

  return refresh;
}

export default useRefreshToken;
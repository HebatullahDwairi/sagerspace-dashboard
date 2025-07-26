import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import { api } from "../api/apiClient";
import { jwtDecode } from "jwt-decode";
import type { User } from "../contexts/AuthContext";

const useAxios = () => {
  const { user, setUser, accessToken } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if(error.response && error.response.status === 401 && !originalRequest.retry) {
          originalRequest.retry = true;
          const newToken = await refresh();
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

          const user: User = jwtDecode(newToken);
          setUser({user_id: user.user_id});
          
          return api(originalRequest);
        }

        return Promise.reject(error);
      }
    );

    return(() => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    });

  }, [user, refresh, accessToken, setUser]);

  return api;
}

export default useAxios;
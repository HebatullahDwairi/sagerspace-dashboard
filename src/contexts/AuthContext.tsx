import { createContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { api } from "../api/apiClient";
import { jwtDecode } from "jwt-decode";
import useRefreshToken from "../hooks/useRefreshToken";

type AuthContextType = {
  user: User | null,
  setUser: Dispatch<SetStateAction<User | null>>,
  isLoading: boolean,
  login: (username: string, password: string) => void,
  accessToken: string,
};

export type User = {
  user_id: number
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider : React.FC<{children: React.ReactNode}> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState('');
  const refresh = useRefreshToken();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const newToken = await refresh();
        setAccessToken(newToken);
        const decoded: User = jwtDecode(newToken);
        setUser({ user_id: decoded.user_id });
      } catch (err) {
        setUser(null);
        console.log(err);
        
      } finally {
        setIsLoading(false); 
      }
    };
    initAuth();
  }, [refresh]);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await api.post('/token/', {
        username,
        password
      });

      const accessToken = res.data.access;
      setAccessToken(accessToken);
      const user: User = jwtDecode(accessToken);
      setUser({user_id: user.user_id});
    } 
    catch (error) {
      console.log(error);
      
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{user, setUser , isLoading, login, accessToken}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
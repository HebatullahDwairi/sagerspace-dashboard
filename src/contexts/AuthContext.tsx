import { createContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import authService from "../services/AuthService";
import { jwtDecode } from "jwt-decode";
import useRefreshToken from "../hooks/useRefreshToken";
import type { User } from "../interfaces/User";

interface AuthContextType  {
  user: User | null,
  setUser: Dispatch<SetStateAction<User | null>>,
  isLoading: boolean,
  login: (username: string, password: string) => void,
  accessToken: string,
};


const AuthContext = createContext<AuthContextType | null>(null);


export const AuthProvider : React.FC<{children: React.ReactNode}> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState('');
  const refresh = useRefreshToken();

  useEffect(() => {
    const initAuth = async () => {
      const existingToken = localStorage.getItem('accessToken');
      const existingUser = localStorage.getItem('user');

      if(existingToken && existingUser) {
        setAccessToken(existingToken);
        setUser(JSON.parse(existingUser));
        setIsLoading(false);
      }
      else {
        try {
          const newToken = await refresh();

          setAccessToken(newToken);
          const decoded: User = jwtDecode(newToken);
          setUser(decoded);

          updateLocalStorage(newToken);

        } catch (err) {
          setUser(null);
          console.log(err);

        } finally {
          setIsLoading(false); 
        }
      }
    };
    initAuth();
  }, [refresh]);

  const updateLocalStorage = (token : string) => {
    localStorage.setItem('accessToken', token);
    const decoded: User = jwtDecode(token);
    localStorage.setItem('user', JSON.stringify(decoded));
  }

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await authService.login(username, password);
      const newToken = res.access;

      setAccessToken(newToken);
      const decoded: User = jwtDecode(newToken);
      setUser(decoded);

      updateLocalStorage(newToken);
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
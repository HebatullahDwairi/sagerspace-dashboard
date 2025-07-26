import { createContext,useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { api } from "../api/apiClient";
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
  user: {userid: number} | null,
  setUser: Dispatch<SetStateAction<{userid: number}>>,
  isLoading: boolean,
  login: (username: string, password: string) => void,
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider : React.FC<{children: React.ReactNode}> = ({children}) => {
  const [user, setUser] = useState<{userid: number} | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if(accessToken) {
      setUser({
        userid: jwtDecode(accessToken).user_id
      });
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const res = await api.post('/token/', {
        username,
        password
      });

      const accessToken = res.data.access;
      localStorage.setItem('access_token', accessToken);
      const user = jwtDecode(accessToken);
      setUser({userid: user.user_id});
      console.log(user.user_id);


    } 
    catch (error) {
      console.log(error);
      
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{user, setUser , isLoading, login}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
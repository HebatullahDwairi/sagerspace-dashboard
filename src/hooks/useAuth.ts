import { useContext } from "react";
import AuthContext from '../contexts/AuthContext';


const useAuth = () => {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error('auth context must be used within a provider');
  }

  return context;
}

export default useAuth;
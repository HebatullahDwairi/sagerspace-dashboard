import { useContext, useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const context = useContext(AuthContext)

  const handleLogin = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      context?.login(username, password);
      console.log('logged in');
      navigate('/dashboard');
    }
    catch (e) {
      console.log('login error');
      
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-3">
      <input 
        type="text" 
        placeholder="username" 
        value={username} 
        onChange={(e) => {
          setUsername(e.target.value)
        }
      }/>
      <input 
        type="password" 
        placeholder="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
        }}/>

      <button type="submit">login</button>
    </form>
  );
}


export default Login;
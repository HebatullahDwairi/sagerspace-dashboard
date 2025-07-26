import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, isLoading, user } = useAuth();

  useEffect(() => {
    if(user && !isLoading) {
      navigate('/dashboard');
    }
  }, [isLoading, navigate, user]);

  const handleLogin = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      login(username, password);
    }
    catch (e) {
      console.log('login error', e);
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      
      {isLoading?
       <ClipLoader />
      :
      <form onSubmit={handleLogin} className="flex flex-col gap-3 rounded-xl shadow-md p-4 bg-gray-50">
        <h2 className="font-bold mb-5 text-lg">Login</h2>
        <input
          type="text"
          placeholder="username"
          className="p-1.5 rounded-xl border-1 border-gray-400 bg-white"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
          }
        }/>
        <input
          type="password"
          placeholder="password"
          value={password}
          className="p-1.5 rounded-xl border-1 border-gray-400 bg-white"
          onChange={(e) => {
            setPassword(e.target.value)
          }}/>
        <button type="submit" className="p-1.5 bg-red-600 text-white rounded-xl mt-3 font-bold hover:bg-red-500 transition-colors">login</button>
      </form>
      }
    </div>
  );
}


export default Login;
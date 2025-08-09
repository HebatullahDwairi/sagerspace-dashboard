import { CircleUser, CloudSun, Circle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import useDrones from "../hooks/useDrones";

export default function Header () {

  const date= new Date();
  const [mins, setMins] = useState(date.getMinutes());
  const [hours, setHours] = useState(date.getHours());
  const {isConnected} = useDrones();
  useEffect(() => {
    const interval = setInterval(() => {
      const date= new Date();
      setMins(date.getMinutes());
      setHours(date.getHours());
    }, 1000);
    
    return(() => {
      clearInterval(interval);
    })
  }, []);

  const navigate = useNavigate();
  const context = useContext(AuthContext);
  

  return (
    <div className="w-screen bg-white shadow-sm ">
      <div className="p-2 flex justify-between items-center mx-auto max-w-7xl">
        <p className="font-black text-xl italic not-lg:ml-17">SAGER</p>
       
        <div className="flex gap-8">
          <div className="flex gap-3 items-center text-gray-500">
            <p>{hours}:{mins} </p>
            <CloudSun size={16} color="teal"/>
          </div>
          {
            context?.user?.user_id ?
              <div className="flex gap-3 items-center">
                <p className="text-gray-500">{isConnected ? 'connected' : 'disconnected'}</p>
                <Circle fill={isConnected ? 'green' : 'red'} color={isConnected ? 'green' : 'red'} size={12}/>
                <CircleUser  size={24} color="gray"/>
              </div>
            :
              <button
                onClick={()=> {
                  navigate('login');
                }}
              >
                Login
              </button>
          }
        </div>

        
      </div>
    </div>
  );
}

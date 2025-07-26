import { CircleUser,Bell, CloudSun, Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export default function Header () {

  const date= new Date();
  const [mins, setMins] = useState(date.getMinutes());
  const [hours, setHours] = useState(date.getHours());
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
        <div className="flex items-center">
          <input
            type="text" 
            placeholder="search"
            className="border-gray-300 border rounded-md p-1 lg:w-50 w-12 pl-9"
          />   
          <Search color="gray"size={19} className="-ml-9 lg:-ml-48"/>
        </div>
        <div className="flex gap-3 items-center text-gray-800">
          <p>{hours}:{mins} </p>
          <CloudSun size={16} color="teal"/>
          <p>33</p>
        </div>
        {
          context?.user?.userid ? 
            <div className="flex gap-3 items-center">
              <Bell size={19} color="gray"/>
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
  );
}

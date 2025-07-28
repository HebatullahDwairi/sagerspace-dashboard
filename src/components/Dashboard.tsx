import { useEffect, useState } from "react";
import useDrones from "../hooks/useDrones";
import useAxios from "../hooks/useAxios";


const Dashboard = () => {
  const [total, setTotal] = useState(0);
  const api = useAxios();
  useEffect(() => {
    const getDrones = async () => {
      try {
        const res = await api.get('/drones/');
        setTotal(res.data.length);
      } catch (error) {
        console.log("failed to fetch drones", error);
      }
    };

    getDrones();
  }, [api]);
  
  const {dangerousDrones, onlineDrones} = useDrones();
  return (
    <div className="grid grid-cols-3 gap-5 font-bold text-lg flex-1 m-5 items-center">
      <div className="shadow-sm rounded-xl bg-white flex-col items-center justify-center p-3 " >
        <p>Total Drones</p>
        <p>{total}</p>
      </div>
      <div className="shadow-sm rounded-xl bg-white flex-col items-center justify-center p-3 " >
        <p>Dangerous Drones</p>
        <p>{dangerousDrones?.length}</p>
      </div>
      <div className="shadow-sm rounded-xl bg-white flex-col items-center justify-center p-3 " >
        <p>Online Drones</p>
        <p>{onlineDrones?.length}</p>
      </div>
      
    </div>
  );
}


export default Dashboard;

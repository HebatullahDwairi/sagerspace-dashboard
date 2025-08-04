import useDrones from "../hooks/useDrones";
import Map from "../components/Map";
import { useEffect } from "react";

const OnlineDrones = () => {
  const { onlineDrones, fetchOnlineDrones } = useDrones();

  useEffect(() => {
    fetchOnlineDrones();
    
  }, [fetchOnlineDrones]);
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex-1 w-full">
      <Map drones={onlineDrones}/>
    </div>
  );
}

export default OnlineDrones;
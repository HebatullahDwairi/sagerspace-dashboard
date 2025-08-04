import useDrones from "../hooks/useDrones";
import Map from "../components/Map";
import { useEffect } from "react";


const DangerousDrones = () => {
  const { dangerousDrones, fetchDangerousDrones } = useDrones();

  useEffect(() => {
    fetchDangerousDrones();
    
  }, [fetchDangerousDrones]);

  
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex-1 w-full">
      <Map drones={dangerousDrones}/>
    </div>
  );
}

export default DangerousDrones;
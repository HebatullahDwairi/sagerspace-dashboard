import { createContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import useAxios from "../hooks/useAxios";
import type { Point } from "geojson";


type DronesContextType = {
  drones: Drone[],
  setDrones: Dispatch<SetStateAction<Drone[]>>
};

export type Drone = {
  serial_number: string,
  is_dangerous: boolean,
  dangerous_reason: string,
  last_location: Point,
  last_seen: string,
};


const DronesContext = createContext<DronesContextType | null>(null);

export const DronesProvider : React.FC<{children: React.ReactNode}> = ({children}) => {
  const [drones, setDrones] = useState<Drone[]>([]);
  const api = useAxios();

  useEffect(() => {
    const getAllDrones = async () => {
      try {
        const res = await api.get('/drones/');
        return res.data;
      }
      catch (e) {
        console.log(e); 
      }
    }
    
    getAllDrones().then((data) => {setDrones(data);});
    
  }, [api]);

  return (
    <DronesContext.Provider value={{drones, setDrones}}>
      {children}
    </DronesContext.Provider>
  );
}



export default DronesContext;
import { createContext, useCallback, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import useAxios from "../hooks/useAxios";
import type { Point } from "geojson";


type DronesContextType = {
  drones: Drone[],
  onlineDrones: Drone[],
  dangerousDrones: Drone[],
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
  const [onlineDrones, setOnlineDrones] = useState<Drone[]>([]);
  const [dangerousDrones, setDangerousDrones] = useState<Drone[]>([]);
  const api = useAxios();

  const getDrones = useCallback(async (filter: string) => {
    try {
      const res = await api.get(`/drones/${filter}`);
      return res.data;
    }
    catch (e) {
      console.log(e); 
    }
  }, [api]);
  

  useEffect(() => {
    
    getDrones('')
      .then((data) => setDrones(data));
    
    getDrones('online')
      .then((data) => setOnlineDrones(data));
    
    getDrones('dangerous')
      .then((data) => setDangerousDrones(data));
    
  }, [getDrones]);


  return (
    <DronesContext.Provider value={{drones, setDrones, onlineDrones, dangerousDrones}}>
      {children}
    </DronesContext.Provider>
  );
}



export default DronesContext;
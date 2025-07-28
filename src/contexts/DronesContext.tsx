import { createContext, useEffect, useState} from "react";
import useAxios from "../hooks/useAxios";
import type { Point } from "geojson";
import mqttClient from '../config/mqtt';
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { updateDroneFromMessage } from "../utl";

type DronesContextType = {
  onlineDrones: Drone[],
  dangerousDrones: Drone[],
  isConnected: boolean
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
  const [onlineDrones, setOnlineDrones] = useState<Drone[]>([]);
  const [dangerousDrones, setDangerousDrones] = useState<Drone[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const api = useAxios();
  const {user} = useAuth();

  useEffect(() => {

    const getDrones = async() => {
      try {
        const onlineRes = await api.get('/drones/online');
        const dangerousRes = await api.get('/drones/dangerous');

        setOnlineDrones(onlineRes.data);
        setDangerousDrones(dangerousRes.data);
      } 
      catch (error) {
        console.log(error);
        
      }
    }
    getDrones();

    
  }, [api, user]);


  useEffect(() => {

    const handleMessage = async(topic : string, message : Buffer) => {
      const serial = topic.split('/')[2];
      const drone = updateDroneFromMessage(topic, message);

      setOnlineDrones((prev) => {
        const existing = prev.find(d => d.serial_number === serial);

        if(existing && drone.is_dangerous && !existing.is_dangerous) {
          toast.error(`Drone with serial ${serial} is dangerous!`);
        }

        const updatedList = prev.some(d => d.serial_number === serial) ? 
          prev.map(d => d.serial_number === serial ? drone : d)
        :
          [...prev, drone]
        
        return updatedList
      });


      setDangerousDrones((prev) => {
        if(drone.is_dangerous) {
          const updatedList = prev.some(d => d.serial_number === serial) ? 
            prev.map(d => d.serial_number === serial ? drone : d)
          :
            [...prev, drone]
            
          return updatedList
        }
        else {
          return prev.filter(d => d.serial_number !== serial)
        }    
      });

    }


    mqttClient.on('connect', function () {
      console.log('connected');
      setIsConnected(true);
    });

    mqttClient.subscribe('thing/product/+/osd', () => {
      console.log('subscribed to topic');
    });

    mqttClient.on('message', handleMessage);

    return () => {
      mqttClient.off('message', handleMessage);
    }

  }, [api]);


  return (
    <DronesContext.Provider value={{ onlineDrones, dangerousDrones, isConnected}}>
      {children}
    </DronesContext.Provider>
  );
}



export default DronesContext;
import { createContext, useCallback, useEffect, useRef, useState} from "react";
import mqttClient from '../config/mqtt';
import toast from "react-hot-toast";
import { updateDroneFromMessage } from "../utl";
import type { Drone } from "../interfaces/Drone";
import useGetOnlineDrones from "../hooks/useGetOnlineDrones";
import useGetDangerousDrones from "../hooks/useGetDangerousDrones";

interface DronesContextType {
  onlineDrones: Drone[],
  dangerousDrones: Drone[],
  isConnected: boolean,
  fetchOnlineDrones: () => void,
  fetchDangerousDrones: () => void,
};


const DronesContext = createContext<DronesContextType | null>(null);

export const DronesProvider : React.FC<{children: React.ReactNode}> = ({children}) => {
  const [onlineDrones, setOnlineDrones] = useState<Drone[]>([]);
  const [dangerousDrones, setDangerousDrones] = useState<Drone[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const updatesEnabled = useRef({ online: false, dangerous: false });
  
  const { refetch: refetchOnline } = useGetOnlineDrones({ enabled: false });
  const { refetch: refetchDangerous } = useGetDangerousDrones({ enabled: false });

  const fetchOnlineDrones = useCallback(async () => {
    const { data } = await refetchOnline();
    if (data) {
      setOnlineDrones(data);
      updatesEnabled.current.online = true;
    }
  }, [refetchOnline]);

  const fetchDangerousDrones = useCallback(async () => {
    const { data } = await refetchDangerous();
    if (data) {
      setDangerousDrones(data);
      updatesEnabled.current.dangerous = true;
    }
  }, [refetchDangerous]);


  useEffect(() => {

    const handleMessage = async(topic : string, message : Buffer) => {
      const serial = topic.split('/')[2];
      const drone = updateDroneFromMessage(topic, message);

      if(updatesEnabled.current.online) {
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
      }
 

      if(updatesEnabled.current.dangerous) {
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

  }, []);


  return (
    <DronesContext.Provider value={{ onlineDrones, dangerousDrones, isConnected, fetchDangerousDrones, fetchOnlineDrones}}>
      {children}
    </DronesContext.Provider>
  );
}



export default DronesContext;




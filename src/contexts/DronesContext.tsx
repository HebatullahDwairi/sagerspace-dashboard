import { createContext, useEffect, useState} from "react";
import useAxios from "../hooks/useAxios";
import type { Point } from "geojson";
import mqttClient from '../config/mqtt';
import {point} from '@turf/turf';
import useAuth from "../hooks/useAuth";

type DronesContextType = {
  onlineDrones: Drone[],
  dangerousDrones: Drone[],
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
      const data = JSON.parse(message.toString());
      const serial = topic.split('/')[2];
      const newLocation = point([data.longitude, data.latitude]).geometry;
      const high =  data.height > 500;
      const fast =  data.horizontal_speed > 10;
      let reason = '';
      if (high && fast)
        reason = 'Flying higher than 500 meters and Moving faster than 10 m/s';
      else if (high)
        reason = 'Flying higher than 500 meters';
      else if (fast)
        reason = 'Moving faster than 10 m/s';

      const isDangerous = reason.length > 0;
      const now = new Date().toISOString();


      let existingDrone = onlineDrones.find(d => d.serial_number === serial);

      if(existingDrone) {
        setOnlineDrones((prev) => {
          return prev.map(d => {
          const updated : Drone = {
            ...d,
            last_location: newLocation,
            is_dangerous: isDangerous,
            last_seen: now
          }
        
          
          return d.serial_number === serial ? updated : d
          });
        });
      }
      else {
          const onlineRes = await api.get('/drones/online');
          setOnlineDrones(onlineRes.data);
      }


      existingDrone = dangerousDrones.find(d => d.serial_number === serial);

      if(existingDrone) {
        if(isDangerous) {
          setDangerousDrones((prev) => {
            return prev.map(d => {
            const updated : Drone = {
              ...d,
              last_location: newLocation,
              is_dangerous: isDangerous,
              last_seen: now
            }
          
            
            return d.serial_number === serial ? updated : d
            });
          });
        }
        else {
          setDangerousDrones((prev) => prev.filter(d => d.serial_number !== serial));
        }
      }
      else if(isDangerous) {
          const res = await api.get('/drones/dangerous');
          setDangerousDrones(res.data);
      }

    }


    mqttClient.on('connect', function () {
      console.log('connected');
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
    <DronesContext.Provider value={{ onlineDrones, dangerousDrones}}>
      {children}
    </DronesContext.Provider>
  );
}



export default DronesContext;
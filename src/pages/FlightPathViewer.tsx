import { useEffect, useState, type FormEvent } from "react";
import useAxios from "../hooks/useAxios";
import Map from "../components/Map";
import type { LineString } from "geojson";
import type { Drone } from "../interfaces/Drone";
import mqttClient from '../config/mqtt';
import { length, lineString } from "@turf/turf";
import { updateDroneFromMessage } from "../utl";
import DroneService from "../services/DroneService";

const FlightPathViewer = () => {
  const api = useAxios();
  const [serial, setSerial] = useState('');
  const [flightPath, setFlightPath] = useState<LineString | null>(null);
  const [drone, setDrone] = useState<Drone | null>(null);
  const totalDistance = flightPath ? length(lineString(flightPath.coordinates)) : 0;



  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!serial) return;
    
    const service = new DroneService(api);
    const d = await service.getFilteredDrones(serial)[0];
    console.log(d);
    
    
    try {
      if (d) {
        setDrone(d);
        const res = await api.get(`drones/${serial}/flight-path/`);
        setFlightPath(res.data);
      }
      else{
        setDrone(null);
      }

    } catch (error) {
      console.log(error);
    }   

    const topic = `thing/product/${serial}/osd`;

    const handleMessage = (topicReceived: string, message: Buffer) => {
      if (topicReceived === topic) {
        const updatedDrone = updateDroneFromMessage(topic, message);

        setFlightPath((prev) => ({
          type: "LineString",
          coordinates: [...(prev?.coordinates ?? []), updatedDrone.last_location.coordinates]
        }));

        if(d) {
          setDrone(updatedDrone);
        }

      }
    };

    mqttClient.subscribe(topic, () => {
      console.log('Subscribed to topic of drone: ', serial);
    });

    mqttClient.on('message', handleMessage);

    return () => {
      mqttClient.unsubscribe(topic);
      mqttClient.off('message', handleMessage);
    };
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex-1 flex flex-col">
      <h1 className=" font-bold mb-5 m-1">Flight Path Viewer</h1>
      <div className="flex justify-between">
        <div className="rounded-lg p-2 w-fit bg-gray-50  shadow-xs">
          <form onSubmit={handleSubmit} className="space-x-2">
            <label>Serial</label>
            <input
              type="text"
              className="border-1 p-1 border-gray-300 rounded-lg bg-white"
              onChange={(e) => { setSerial(e.target.value) }}
              value={serial}
            />
            <button
              type="submit"
              className="p-1.5 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-500 transition-colors"
            >
              Find
            </button>
          </form>
        </div>
        { flightPath && <div className="rounded-lg p-2 w-fit bg-gray-50  shadow-xs text-gray-500 font-bold pt-3">
          Total distance: {totalDistance.toFixed(1)} km
        </div>}
      </div>
      <div className="flex-1">
        {(drone && flightPath) ?
          <Map drones={[drone]} flightPath={flightPath} />
          :
          <div className="flex h-2/3 items-center justify-center font-bold text-gray-500 ">
            Enter a drone's serial number to view its flight path
          </div>
        }
      </div>
    </div>
  );
}

export default FlightPathViewer;
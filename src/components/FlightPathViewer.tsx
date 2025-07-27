import { useState, type FormEvent } from "react";
import useAxios from "../hooks/useAxios";
import useDrones from "../hooks/useDrones";
import Map from "./Map";
import type { LineString } from "geojson";
import type { Drone } from "../contexts/DronesContext";

const FlightPathViewer = () => {
  const { drones } = useDrones();
  const api = useAxios();
  const [serial, setSerial] = useState('');
  const [flightPath, setFlightPath] = useState<LineString | null>(null);
  const [drone, setDrone] = useState<Drone | null>(null);
  const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const drone = drones.find((d) => d.serial_number === serial);

      if(drone) {
        setDrone(drone);
        const res = await api.get(`drones/${serial}/flight-path/`);
        setFlightPath(res.data);
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex-1 flex flex-col">
      <h1 className=" font-bold mb-5 m-1">Flight Path Viewer</h1>
      <div className="rounded-lg p-2 w-fit bg-gray-50  shadow-xs">
        <form onSubmit={handleSubmit} className="space-x-2">
          <label>Serial</label>
            <input
              type="text"
              className="border-1 p-1 border-gray-300 rounded-lg bg-white"
              onChange={(e) => {setSerial(e.target.value)}}
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
      <div className="flex-1">
        {(drone && flightPath) ? 
          <Map drones={[drone]} flightPath={flightPath}/> 
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
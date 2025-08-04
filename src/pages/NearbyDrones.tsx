import { useState } from "react";
import Table from "../components/Table";
import type { Drone } from "../interfaces/Drone";
import useAxios from "../hooks/useAxios";
import Map from "../components/Map";
import DroneService from "../services/DroneService";

const NearbyDrones = () => {
  const [nearbyDrones, setNearbyDrones] = useState<Drone[]>([]);
  const [coordinates, setCoordinates] = useState<[string, string]>(['', '']);


  const api = useAxios();

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const longitude = parseFloat(coordinates[0]);
    const latitude = parseFloat(coordinates[1]);

    if (isNaN(longitude) || isNaN(latitude)) return;
  
    try {
      const service = new DroneService(api);
      const nearby = await service.getNearbyDrones(longitude, latitude);
      setNearbyDrones(nearby);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex-1 flex flex-col">
      <h1 className=" font-bold m-1">Nearby Drones</h1>
  
      <div className="flex gap-3 items-center ">
        <form onSubmit={handleSubmit} className="rounded-lg p-2 w-fit bg-gray-50 shadow-xs flex gap-3">
          <input
            type="text"
            placeholder="longitude"
            className="border-1 p-1 border-gray-300 rounded-lg bg-white w-30"
            value={coordinates[0]}
            onChange={(e) => setCoordinates([e.target.value, coordinates[1]])}
          />
          <input
            type="text"
            placeholder="latitude"
            className="border-1 p-1 border-gray-300 rounded-lg bg-white w-30"
            value={coordinates[1]}
            onChange={(e) => setCoordinates([coordinates[0], e.target.value])}
          />
          <button
            type="submit"
            className="p-1.5 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-500 transition-colors"
          >
            Find
          </button>
        </form>
      </div>
      {
        nearbyDrones.length > 0? 
          <div className="w-full flex gap-4 flex-1">
            <div className="w-1/2">
              <Table data={nearbyDrones} />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 flex-1 w-1/2">
              <Map 
                drones={nearbyDrones} 
                point={[parseFloat(coordinates[0]), parseFloat(coordinates[1])]} 
              />

            </div>
          </div>
        :
          <div className="flex h-2/3 items-center justify-center font-bold text-gray-500 ">
            No nearby drones found, enter some coordinates
          </div>
      }
    </div>
  );
}

export default NearbyDrones;
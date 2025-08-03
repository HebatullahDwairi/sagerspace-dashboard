import { useState } from "react";
import Table from "../components/Table";
import type { Drone } from "../interfaces/Drone";
import useAxios from "../hooks/useAxios";
import Map from "../components/Map";
import DroneService from "../services/DroneService";

const NearbyDrones = () => {
  const [nearbyDrones, setNearbyDrones] = useState<Drone[]>([]);
  const [coordinates, setCoordinates] = useState<{
    longitude: string,
    latitude: string
  } >({
    longitude: '',
    latitude: ''
  });

  const [point, setPoint] = useState<number[]>([]);

  const api = useAxios();

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const longitude = parseFloat(coordinates.longitude);
    const latitude = parseFloat(coordinates.latitude);

    if(!longitude || !latitude) return;
  
    try {
      const service = new DroneService(api);
      const nearby = await service.getNearbyDrones(longitude, latitude);
      setNearbyDrones(nearby);
      setCoordinates({
        longitude: '',
        latitude: ''
      })
      setPoint([longitude, latitude]);

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
            value={coordinates.longitude}
            onChange={(e) => {
              setCoordinates({
                ...coordinates,
                longitude: e.target.value
              });
            }}
          />
          <input
            type="text"
            placeholder="latitude"
            className="border-1 p-1 border-gray-300 rounded-lg bg-white w-30"
            value={coordinates.latitude}
            onChange={(e) => {
              setCoordinates({
                ...coordinates,
                latitude: e.target.value
              });
            }}
          />
          <button
            type="submit"
            className="p-1.5 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-500 transition-colors"
          >
            Find
          </button>
        </form>
        { point.length > 0 && <h2>drones within 5km from point {point[0]}, {point[1]}</h2>}
      </div>
      {
        nearbyDrones.length > 0? 
          <div className="w-full flex gap-4 flex-1">
            <div className="w-1/2">
              <Table data={nearbyDrones} />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 flex-1 w-1/2">
              <Map drones={nearbyDrones} point={point}/>
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
import { useEffect, useState } from "react";
import { getAllDrones } from "../api/drones";
import Table from "./Table";
import type { Point } from "geojson";

export type Drone = {
  serial_number: string,
  is_dangerous: boolean,
  dangerous_reason: string,
  last_location: Point,
  last_seen: string,
};



const DronesList = () => {
  const [drones, setDrones] = useState<Drone[]>([]);

  useEffect(() => {
    getAllDrones().then((data) => {setDrones(data); console.log(data);
    });
    
    
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h1 className=" font-bold mb-5 m-1">Drones List</h1>
      <Table data={drones} />
    </div>
  );
}

export default DronesList;
import Table from "./Table";
import useDrones from "../hooks/useDrones";
import useAxios from "../hooks/useAxios";
import { useState } from "react";
import type { Drone } from "../contexts/DronesContext";



const DronesList = () => {
  const {drones} = useDrones();
  const api = useAxios();
  const [filteredDrones, setFilteredDrones] = useState<Drone[]>([]);

  const handleChange = async (e) => {
    const content = e.target.value;
    if(!content) {
      setFilteredDrones([]);
      return;
    }

    try {
      const res = await api.get(`/drones/?partial_serial=${content}`);
      setFilteredDrones(res.data);
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h1 className=" font-bold mb-5 m-1">Drones List</h1>
      <div className="rounded-lg p-2 w-fit bg-gray-50 space-x-2 shadow-xs">
        <label>Filter by serial</label>
          <input 
            type="text"
            className="border-1 p-1 border-gray-300 rounded-lg bg-white"
            onChange={handleChange}
           />
        </div>
      <Table data={filteredDrones.length > 0? filteredDrones : drones} />
    </div>
  );
}

export default DronesList;
import Table from "../components/Table";
import { useEffect, useState } from "react";
import type { Drone } from "../interfaces/Drone";
import useGetDrones from "../hooks/useGetDrones";
import DroneService from "../services/DroneService";
import useAxios from "../hooks/useAxios";
import LoadingComponent from "../components/LoadingComponent";

const DronesList = () => {
  const { data, isLoading } = useGetDrones();
  const drones = data;
  
  const [searchValue, setSearchValue] = useState('');
  const [filteredDrones, setFilteredDrones] = useState<Drone[] | null>(null);
  const api = useAxios();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (!searchValue) {
        setFilteredDrones(null);
        return;
      }

      const fetchFiltered = async () => {
        try {
          const service = new DroneService(api);
          const filtered = await service.getFilteredDrones(searchValue);
          setFilteredDrones(filtered);
        } 
        catch (error) {
          console.log(error);
          setFilteredDrones(null);
        }
      };

      fetchFiltered();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [api, searchValue]);


  if(isLoading) {
    return <LoadingComponent />
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h1 className="font-bold mb-5 m-1">Drones List</h1>

      <div className="rounded-lg p-2 w-fit bg-gray-50 space-x-2 shadow-xs">
        <label htmlFor="drone-filter">Filter by serial</label>
        <input
          id="drone-filter"
          type="text"
          className="border p-1 border-gray-300 rounded-lg bg-white"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {searchValue && filteredDrones?.length === 0 ? 
        <p className="text-gray-500 mt-4">No drones match that serial</p>
      : 
        <Table data={
          searchValue && filteredDrones?.length ? filteredDrones :  drones
        } />
      }
    </div>
  );
};

export default DronesList;

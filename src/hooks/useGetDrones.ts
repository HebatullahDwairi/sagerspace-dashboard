import { useEffect } from "react";
import DroneService from "../services/DroneService";
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";


const useGetDrones = () => {
  const api = useAxios();
  const service = new DroneService(api);

  const { isError, error, data, isLoading } =  useQuery({
    queryKey: ['drones'],
    queryFn: service.getDrones.bind(service),
    staleTime: 1000,  
  });

  useEffect(() => {
    if(isError) {
      toast.error(error.message);
    }
  }, [error, isError]);

  return { isLoading, data };
 
}

export default useGetDrones;
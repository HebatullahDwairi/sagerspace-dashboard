import { useEffect } from "react";
import DroneService from "../services/DroneService";
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";


const useGetDangerousDrones = (options = { enabled: true }) => {
  const api = useAxios();
  const service = new DroneService(api);

  const { isError, error, data, isLoading, refetch } =  useQuery({
    queryKey: ['dangerous-drones'],
    queryFn: service.getDangerousDrones.bind(service),
    staleTime: 1000,  
    enabled: options.enabled,
  });

  useEffect(() => {
    if(isError) {
      toast.error(error.message);
    }
  }, [error, isError]);

  return { isLoading, data, refetch};
 
}

export default useGetDangerousDrones;
import { useContext } from "react";
import DronesContext from "../contexts/DronesContext";

const useDrones = () => {
  const context = useContext(DronesContext);

  if(!context) {
    throw new Error('drone context must be used within a provider');
  }

  return context;
}

export default useDrones;
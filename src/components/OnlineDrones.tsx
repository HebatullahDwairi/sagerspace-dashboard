import useDrones from "../hooks/useDrones";
import Map from "./Map";

const OnlineDrones = () => {
  const { drones } = useDrones();
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex-1 w-full">
      <Map drones={drones}/>
    </div>
  );
}

export default OnlineDrones;
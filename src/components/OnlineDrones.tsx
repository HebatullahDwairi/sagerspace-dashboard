import useDrones from "../hooks/useDrones";
import Map from "./Map";

const OnlineDrones = () => {
  const { onlineDrones } = useDrones();
  console.log(onlineDrones);
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex-1 w-full">
      <Map drones={onlineDrones}/>
    </div>
  );
}

export default OnlineDrones;
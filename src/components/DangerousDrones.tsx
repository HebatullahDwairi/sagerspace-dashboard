import useDrones from "../hooks/useDrones";
import Map from "./Map";


const DangerousDrones = () => {
  const { dangerousDrones } = useDrones();

  console.log(dangerousDrones);
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex-1 w-full">
      <Map drones={dangerousDrones}/>
    </div>
  );
}

export default DangerousDrones;
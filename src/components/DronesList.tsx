import Table from "./Table";
import useDrones from "../hooks/useDrones";



const DronesList = () => {
  const {drones} = useDrones();

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h1 className=" font-bold mb-5 m-1">Drones List</h1>
      <Table data={drones} />
    </div>
  );
}

export default DronesList;
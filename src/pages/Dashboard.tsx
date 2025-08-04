import { Radar, AlertTriangle, Drone } from "lucide-react";
import useGetStats from "../hooks/useGetStats";

const Dashboard = () => {

  const {data, isLoading} = useGetStats();

  if(isLoading) return <div>loading...</div>;

  const stats = [
    {
      label: "Total Drones",
      value: data.total,
      icon: <Drone className="text-blue-600 w-7 h-7" />,
      bg: "bg-blue-50",
    },
    {
      label: "Dangerous Drones",
      value: data.dangerous,
      icon: <AlertTriangle className="text-red-600 w-7 h-7" />,
      bg: "bg-red-50",
    },
    {
      label: "Online Drones",
      value: data.online,
      icon: <Radar className="text-green-600 w-7 h-7" />,
      bg: "bg-green-50",
    },
  ];

  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center ${stat.bg}`}
        >
          <div className="mb-3">{stat.icon}</div>
          <p className="text-gray-600 text-md">{stat.label}</p>
          <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;

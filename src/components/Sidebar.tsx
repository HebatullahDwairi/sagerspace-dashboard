import { House, Drone, TriangleAlert, Route, LocateFixed, Radio} from "lucide-react";
import { NavLink } from "react-router-dom";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import { useState } from "react";

const links = [
  {name: 'Dashboard', icon: House, to: '/dashboard'},
  {name: 'Drones\u00A0List', icon: Drone, to: '/drones-list'},
  {name: 'Online\u00A0Drones', icon: Radio, to: '/online-drones'},
  {name: 'Dangerous\u00A0Drones', icon: TriangleAlert, to: '/dangerous-drones'},
  {name: 'Flight\u00A0Path\u00A0Viewer', icon: Route, to: '/path-viewer'},
  {name: 'Nearby\u00A0Drones', icon: LocateFixed, to: '/nearby-drones'},
];


export default function Sidebar () {

  const [isOpen, setIsOpen] = useState(() => {
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    const isSmallScreen = window.innerWidth < 740;
    return !(isPortrait || isSmallScreen);
  });
  return (
    <div
      className={`
        bg-white  p-4 not-lg:p-3 lg:rounded-xl
        fixed portrait:fixed lg:relative top-0 left-0 z-50 transition-all duration-300 
        ${isOpen ? 'w-52 h-full shadow-sm ' : 'w-17'}
      `}
    >

      <div className="flex items-center">
        <div className={` text-gray-500 text-sm `}>
          <div className={`${isOpen? 'block': 'hidden'} pr-2`}>
            <span className="font-bold">CENTER</span>
             DASHBOARD
          </div>
        </div>
        <button onClick={() => {setIsOpen(!isOpen)}} className="mx-auto">
        {isOpen?
          <ChevronLeftCircle size={19} color="gray"/>
          :
          <ChevronRightCircle size={19} color="gray"/>}
        </button>
      </div>

      <div className={`space-y-2 text-sm mt-5 ${isOpen? 'block' : 'hidden'} lg:block`}>

        {links.map(({name, icon: Icon, to}) => (
          <NavLink 
            to={to} 
            key={name} 
            onClick={() => {
              if(window.innerWidth < 640) 
                setIsOpen(!isOpen)
            }}
            className={({isActive}) => `flex gap-2 items-center p-1.5 rounded-md ${isActive && "bg-gray-100"}`}>
            <Icon size={17} className="shrink-0 "  />
            <p className={`${isOpen? 'block': 'hidden'} font-semibold `}>{name}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
 
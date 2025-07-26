import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxMap, { NavigationControl, FullscreenControl, Source, Layer, type MapRef, Popup } from 'react-map-gl/mapbox';
import type { Drone } from '../contexts/DronesContext';
import { useRef, useState } from 'react';
import droneIcon from '../assets/drone.png';

const Map = ({ drones }: { drones: Drone[] }) => {
  const points = drones.map(drone => (
    {
      type: 'Feature' as const,
      geometry: drone.last_location,
      properties: {
        serial: drone.serial_number
      }
    }
  ));
  const data = { type: 'FeatureCollection' as const, features: points };
  const mapRef = useRef<MapRef>(null);
  const [popupData, setPopupData] = useState<{
    long: number,
    lat: number,
    drone: Drone,
  } | null>(null);
  

  return (
    <div className="w-full  bg-white rounded-xl relative" id="map" style={{ height: '100%' }}>
      <MapboxMap
        ref={mapRef}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        initialViewState={{
          longitude: 35.9,
          latitude: 31.9,
          zoom: 4,
        }}
        mapStyle={'mapbox://styles/mapbox/satellite-streets-v12'}
        style={{
          borderRadius: "10px",
        }}

        onLoad={() => {
          const map = mapRef.current?.getMap();
          if(!map) return;

          map?.loadImage(droneIcon, (error, image) => {
            if (error || !image) return;

            map.addImage('drone-icon', image);
          });

          map.on('click', 'drone', (e) => {
            const serial = e.features?.[0]?.properties?.serial;
            const drone = drones.filter(drone => drone.serial_number === serial)[0];

            setPopupData({
              long: drone.last_location.coordinates[0],
              lat: drone.last_location.coordinates[1],
              drone: drone
            });
            console.log(drone);
            
          });
          
         }
        }
      
      >
        <NavigationControl />
        <FullscreenControl />

        <Source type='geojson' id='drones' data={data}>
          <Layer 
            id='drone'
            type='symbol'
            layout={{
              'icon-image': 'drone-icon'
            }}
            
          />
        </Source>
        {popupData && <Popup
          longitude={popupData?.long}
          latitude={popupData?.lat}
          anchor='bottom'
          onClose={() => {
            setPopupData(null);
          }}
        >
          <div className='p-2 space-y-2 text-gray-700'>
            <h2 className='font-bold mb-4'>Drone Info</h2>
            <p>
              <span className="font-bold">Serial Number: </span>
               {popupData.drone.serial_number}
            </p>
            <p>
              <span className="font-bold">Dangerous? :</span> 
                {popupData.drone.is_dangerous? `Yes, Reason: ${popupData.drone.dangerous_reason}`: 'No'}
            </p>
          </div>
        </Popup>}
      </MapboxMap>

    </div>
  );
}

export default Map;
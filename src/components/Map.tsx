import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxMap, { NavigationControl, FullscreenControl, Source, Layer, type MapRef, Popup } from 'react-map-gl/mapbox';
import type { Drone } from '../contexts/DronesContext';
import { useRef, useState } from 'react';
import blackDrone from '../assets/drone-icon.png';
import redDrone from '../assets/danger-drone-icon.png';
import { circle } from '@turf/circle';
import type { LineString } from 'geojson';
import { bbox } from '@turf/turf';

type MapProps = {
  drones: Drone[],
  point? : number[],
  flightPath?: LineString
};

const Map = ({ drones, point, flightPath }: MapProps) => {
  const points = drones.map(drone => (
    {
      type: 'Feature' as const,
      geometry: drone.last_location,
      properties: {
        serial: drone.serial_number,
        icon: drone.is_dangerous ?  'red-drone' : 'black-drone'
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
          longitude: drones.length === 1 ? drones[0].last_location.coordinates[0] : 35.9,
          latitude: drones.length === 1 ? drones[0].last_location.coordinates[1] : 31.9,
          zoom: 10,
        }}
        
        mapStyle={'mapbox://styles/mapbox/satellite-streets-v12'}
        style={{
          borderRadius: "10px",
        }}

        onLoad={() => {
          const map = mapRef.current?.getMap();
          if(!map) return;

          map?.loadImage(blackDrone, (error, image) => {
            if (error || !image) return;

            map.addImage('black-drone', image);
          });
          map?.loadImage(redDrone, (error, image) => {
            if (error || !image) return;

            map.addImage('red-drone', image);
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


          if(point) {

            const c = circle(point, 5, { steps: 60, units: 'kilometers' });
            map.addSource('circle', {
              type: 'geojson',
              data: c
            });
            map.addLayer({
              id: 'point',
              source: 'circle',
              type: 'line',
              paint: {
                'line-color': 'red',
                'line-width': 2
              }
            });

            const [minLng, minLat, maxLng, maxLat] = bbox(c);

            mapRef.current?.fitBounds(
              [
                [minLng, minLat],
                [maxLng, maxLat]
              ],
              { padding: 40, duration: 1000 }
            );
          }
          
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
              'icon-image': ['get', 'icon'],
              'icon-size': 0.4
            }}
            paint={{
              'icon-opacity-transition' : {duration: 0},
              'icon-color-transition' : {duration: 0},
              'icon-halo-blur-transition': {duration: 0},
              'icon-halo-color-transition': {duration: 0},
              'icon-halo-width-transition': {duration: 0},

            }}
            
          />
        </Source>
        { flightPath && 
          <Source 
            id='flightpath'
            type='geojson'
            data={flightPath}
          >
            <Layer
              id='path'
              type='line'
              paint={{
                'line-color': 'white',
                'line-dasharray': [2,2],
                'line-width': 2
              }}
            />
          </Source>
        }
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
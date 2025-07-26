import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxMap, { NavigationControl, FullscreenControl, Source, Layer } from 'react-map-gl/mapbox';
import type { Drone } from './DronesList';
import { useState } from 'react';

const Map = ({ drones }: {drones: Drone[]}) => {
  const [styleDone, setStyleDone] = useState(false);
  const points = drones.map(drone => (
    {
      type: 'Feature' as const,
      geometry: drone.last_location,
      properties: {}
    }
  ));

  

  

  return (
    <div className="w-full portrait:w-full lg:w-2/5 bg-white rounded-xl relative" id="map" style={{ height: '100%' }}>
      <MapboxMap
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        initialViewState={{
          longitude: 35.9,
          latitude: 31.9,
          zoom: 4,
        }}
        mapStyle={'mapbox://styles/mapbox/standard-satellite'}
        style={{
          borderRadius: "10px",
        }}
        onLoad={() => {
          setStyleDone(true);
        }}
      >
        <NavigationControl />
        <FullscreenControl />
        
        {styleDone && <Source type='geojson' id='drones' data={{type: 'FeatureCollection', features: points}}>
          <Layer 
            id='drone'
            type='circle'
            paint={{
              'circle-color': 'black',
              'circle-radius' : 5
            }}
          >
            
          </Layer>
        </Source>}
        
      </MapboxMap>
      
    </div>
  );
}

export default Map;
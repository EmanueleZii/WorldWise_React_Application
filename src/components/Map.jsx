
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import {MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents} from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContext';
import { latLng } from 'leaflet';
import { useGeolocation } from '../hooks/useGeolocation';
//import  Button from './Button';
import PropTypes from 'prop-types';


 function Map() {

  const {cities} = useCities();
  const [mapPosition, setMapPosition] = useState([40, 53]);
  const [searchParams] = useSearchParams();
  const {isLoading: isLoadingPosition, position: geolocationPosition, getPosition,} = useGeolocation();

  const mapLat = searchParams.get('lat');
  const mapLng = searchParams.get('lng');

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([parseFloat(mapLat), parseFloat(mapLng)]);
  }, [mapLat, mapLng]);

  useEffect(function() {
    if(geolocationPosition) 
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },[geolocationPosition]
  );

  return (
    <div className={styles.mapContainer} >
    {!geolocationPosition &&<button className='button' onClick={getPosition}>
      {isLoadingPosition ? 'Loading...' : 'Use Your Position'}
    </button>}
    <MapContainer
        center={mapPosition} 
         zoom={13} 
         scrollWheelZoom={true} 
         className={styles.map}  >
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
       {cities.map((city) =>  <Marker position={[city.position.lat,city.position.lng]} 
       key={city.id}>
          <Popup>
          <span>{city.emoji}</span>
          <span>{city.cityName}</span>
          </Popup>
        </Marker> ) }

        <ChangeCenter position={mapPosition} />
        <DetectClick />
       
      </MapContainer>
     
    </div>
  )
}

function ChangeCenter({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [map, position]);
  return null;
}

ChangeCenter.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
};

function DetectClick(){
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e, latLng.lat}&lng=${e, latLng.latLng}`),
  });
}

export default Map;
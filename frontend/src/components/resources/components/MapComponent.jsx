import React, { useEffect, useState } from 'react';
import { GOOGLE_MAPS_API_KEY } from './mapsAPI';
import './css/parksPage.css';

function MapComponent({ query }) {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setUserLocation(location);
          },
          (error) => {
            console.error('Error getting user location:', error);
            setUserLocation({ lat: 37.7749, lng: -122.4194 }); // Default coordinates (e.g., San Francisco)
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        setUserLocation({ lat: 37.7749, lng: -122.4194 }); // Default coordinates (e.g., San Francisco)
      }
    };

    getUserLocation();
  }, []);
  return (
    <div className="parks-page-container">
      {userLocation && (
        <iframe
          title="Google Map"
          className="map-container"
          width="600"
          height="450"
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/search?key=${GOOGLE_MAPS_API_KEY}&center=${userLocation.lat},${userLocation.lng}&zoom=14&q=${query}`}
        ></iframe>
      )}
    </div>
  );
}

export default MapComponent;
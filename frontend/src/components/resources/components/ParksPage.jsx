import React, { useEffect, useRef, useState } from 'react';
import './css/parksPage.css';
import { GOOGLE_MAPS_API_KEY } from './mapsAPI';

function ParksPage({ onBackClick }) {
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
      <h2>Parks Guide</h2>
      {/* Embed Google Map with user's location-centered map and search for parks */}
      {userLocation && (
        <iframe
          title="Google Map"
          className="map-container"
          width="600"
          height="450"
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/search?key=${GOOGLE_MAPS_API_KEY}&center=${userLocation.lat},${userLocation.lng}&zoom=14&q=parks`}
        ></iframe>
      )}
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default ParksPage;
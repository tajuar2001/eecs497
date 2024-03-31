import React, { useEffect, useRef } from 'react';
import './css/parksPage.css';
import { GOOGLE_MAPS_API_KEY } from './mapsAPI';

function ParksPage({ onBackClick }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const initializeMap = (userLocation) => {
      const mapOptions = {
        center: userLocation,
        zoom: 14, // Default zoom level
      };

      const map = new window.google.maps.Map(mapRef.current, mapOptions);

      // Search for nearby parks
      const request = {
        location: userLocation,
        radius: 5000, // Search radius in meters
        type: 'park',
      };

      const service = new window.google.maps.places.PlacesService(map);
      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          results.forEach((place) => {
            const marker = new window.google.maps.Marker({
              position: place.geometry.location,
              map: map,
              title: place.name,
            });

            marker.addListener('click', () => {
              window.open(`https://www.google.com/maps/search/?api=1&query=${place.geometry.location.lat()},${place.geometry.location.lng()}`, '_blank');
            });
          });
        }
      });
    };

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            initializeMap(userLocation);
          },
          (error) => {
            console.error('Error getting user location:', error);
            // Fallback to default location if user location is not available
            const defaultLocation = { lat: 37.7749, lng: -122.4194 }; // Default coordinates (e.g., San Francisco)
            initializeMap(defaultLocation);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        // Fallback to default location if geolocation is not supported
        const defaultLocation = { lat: 37.7749, lng: -122.4194 }; // Default coordinates (e.g., San Francisco)
        initializeMap(defaultLocation);
      }
    };

    if (window.google && window.google.maps) {
      getUserLocation();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.onload = getUserLocation;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="parks-page-container">
      <h2>Parks Guide</h2>
      <div ref={mapRef} className="map-container"></div>
      <button className="back-button" onClick={onBackClick}></button>
    </div>
  );
}

export default ParksPage;
'use client'
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Restaurant } from '@/types/restaurant.type';


//delete L.Icon.Default.prototype.;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const RestaurantMap = ({restaurants}:{restaurants:Restaurant[]}) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {position ? (
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={position}>
            <Popup>
              You are here: <br />
              Latitude: {position[0].toFixed(2)} <br />
              Longitude: {position[1].toFixed(2)}
            </Popup>
          </Marker>
          {restaurants.map((restaurant) => (
            <Marker
              key={restaurant.id}
              position={[restaurant.latitude, restaurant.longitude]}
            >
              <Popup>
                <h3>{restaurant.name}</h3>
                <p>{restaurant.address}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <p>Loading map and location...</p>
      )}
    </div>
  );
};

export default RestaurantMap;

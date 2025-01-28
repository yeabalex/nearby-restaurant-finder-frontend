"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Restaurant } from "@/types/restaurant.type";
import { useSearchParams } from "next/navigation";

// Default icon
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const selectedIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Custom icon for the current location
const currentLocationIcon = new L.Icon({
  iconUrl: "/gps.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const RestaurantMap = ({ restaurants }: { restaurants: Restaurant[] }) => {
  const [currentPosition, setCurrentPosition] = useState<[number, number] | null>(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<number | null>(null);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const param = useSearchParams();

  useEffect(() => {
    const resParam = param.get("restaurant");
    const geolocation = navigator.geolocation;

    if (resParam) {
      const selectedId = parseInt(resParam, 10);
      setSelectedRestaurantId(selectedId);

      const selectedRestaurant = restaurants.find((res) => res.id === selectedId);
      if (selectedRestaurant) {
        setCurrentPosition([selectedRestaurant.latitude, selectedRestaurant.longitude]);
      }
    } else {
      // Show all restaurants (default view)
      if (restaurants.length > 0) {
        const defaultPosition:[number, number] | null = [restaurants[0].latitude, restaurants[0].longitude];
        setCurrentPosition(defaultPosition);
      }
    }

    geolocation.watchPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        setPosition([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location.");
      }
    );
  }, [param, restaurants]);

  if (!currentPosition) return <div>Loading...</div>;

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={currentPosition}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Show current position */}
        {position && (
          <Marker position={position} icon={currentLocationIcon}>
            <Popup>
              <p>You are here</p>
            </Popup>
          </Marker>
        )}

        {/* Restaurant markers */}
        {restaurants
          .filter((res) => !selectedRestaurantId || res.id === selectedRestaurantId)
          .map((res) => (
            <Marker
              key={res.id}
              position={[res.latitude, res.longitude]}
              icon={new L.Icon.Default()}
            >
              <Popup>
                <h3>{res.name}</h3>
                <p>{res.address}</p>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default RestaurantMap;

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Restaurant } from "@/types/restaurant.type";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const currentLocationIcon = new L.Icon({
  iconUrl: "/gps.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapComponentProps {
  currentPosition: [number, number];
  position: [number, number] | null;
  restaurants: Restaurant[];
  selectedRestaurantId: number | null;
}

const MapComponent = ({ 
  currentPosition,
  position,
  restaurants,
  selectedRestaurantId 
}: MapComponentProps) => {
  return (
    <MapContainer
      center={currentPosition}
      zoom={13}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      
      {position && (
        <Marker position={position} icon={currentLocationIcon}>
          <Popup>
            <p>You are here</p>
          </Popup>
        </Marker>
      )}

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
  );
};

export default MapComponent;
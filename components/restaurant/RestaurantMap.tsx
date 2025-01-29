"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Restaurant } from "@/types/restaurant.type";

const Map = dynamic(
  () => import("@/components/ui/Map"),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-black">Loading map...</p>
      </div>
    )
  }
);

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
    } else if (restaurants.length > 0) {
      setCurrentPosition([restaurants[0].latitude, restaurants[0].longitude]);
    }

    geolocation.watchPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        setPosition([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, [param, restaurants]);


  return (
    <div className="h-full w-full">
      {currentPosition&&<Map
        currentPosition={currentPosition}
        position={position}
        restaurants={restaurants}
        selectedRestaurantId={selectedRestaurantId}
      />}
    </div>
  );
};

export default RestaurantMap;
"use client";
import { useEffect, useState } from "react";
import RestaurantMap from "./RestaurantMap";
import RestaurantList from "./RestaurantList";
import type { Restaurant } from "@/types/restaurant.type";
import { GraphQLClient } from "@/utils/apiClient";
import { baseURL } from "@/constants/url";
import { useSearchParams } from "next/navigation";
//import { ViewToggle } from "../ui/ViewToggle";

export default function RestaurantLandingPage() {
  const [error, setError] = useState<string | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [locationAllowed, setLocationAllowed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const params = useSearchParams();

  useEffect(() => {
    async function fetchRestaurants(lat: number, lon: number) {
      setLoading(true);
      try {
        const graphQlClient = new GraphQLClient(baseURL);
        const res = await graphQlClient.query(
          `
          query GetNearbyRestaurantsWithoutReviews($lat: Float!, $lon: Float!, $radius: Float!) {
            nearbyRestaurantsWithoutReviews(lat: $lat, lon: $lon, radius: $radius) {
              id
              name
              address
              latitude
              longitude
              openingHours
              averageStars
              distance
            }
          }
          `,
          { lat, lon, radius: 50 }
        );
        setRestaurants((res.data as { nearbyRestaurantsWithoutReviews: Restaurant[] }).nearbyRestaurantsWithoutReviews);
      } catch (err) {
        setError(`Failed to fetch restaurants. Please try again: ${err}`);
      } finally {
        setLoading(false);
      }
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationAllowed(true);
          fetchRestaurants(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setLocationAllowed(false);
          setLoading(false);
        }
      );
    } else {
      setLocationAllowed(false);
    }
  }, []);

  if (locationAllowed === false) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-md">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <p className="text-gray-700 mb-4">Please enable location services to find nearby restaurants.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex md:flex-row h-screen">
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <p className="text-gray-700">Loading restaurants...</p>
        </div>
      ) : (
        <>
          <div className={`w-full overflow-y-auto ${params.get("view") === "list" || params.get("view") === null ? "" : "hidden"}`}>
            {error ? <p>{error}</p> : <RestaurantList restaurants={restaurants} />}
          </div>
          <div className={`${params.get("view") === "map" ? "" : "hidden"} md:block w-full`}>
            {error ? <p>{error}</p> : <RestaurantMap restaurants={restaurants} />}
          </div>
        </>
      )}
    </div>
  );
}

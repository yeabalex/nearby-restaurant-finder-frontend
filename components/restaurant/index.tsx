import RestaurantMap from "./RestaurantMap";
import RestaurantList from "./RestaurantList";
import type { Restaurant } from "@/types/restaurant.type";
export default function RestaurantLandingPage() {
    const restaurants: Restaurant[] = [
        {
          id: 1,
          name: "The Hungry Fox",
          address: "123 Main St, Downtown",
          distance: 0.3,
          openingHours: "9:00 AM - 10:00 PM",
          averageStars: 4.1,
          latitude: 9.0355,
          longitude: 38.7468,
          reviews: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: "Pasta Paradise",
          address: "456 Oak Ave, Uptown",
          distance: 1.2,
          openingHours: "11:00 AM - 11:00 PM",
          averageStars: 4.2,
          latitude: 9.0274,
          longitude: 38.7578,
          reviews: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Restaurant List on the Left */}
      <div className="w-full overflow-y-auto">
        <RestaurantList restaurants={restaurants}/>
      </div>
      <div className="w-full">
        <RestaurantMap restaurants={restaurants}/>
      </div>
    </div>
  );
}

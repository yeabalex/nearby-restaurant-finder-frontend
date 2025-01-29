import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star } from 'lucide-react';
import type { Restaurant } from '@/types/restaurant.type';
import { isOpenNow } from '@/utils/checkIfRestaurantIsOpen';
import { useRouter } from 'next/navigation';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const openStatus = isOpenNow(restaurant.openingHours);
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-4 hover:shadow-md transition-shadow duration-300 border border-gray-200 dark:border-gray-700 flex items-center space-x-4"
    >
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 truncate">
          {restaurant.name}
        </h3>

        <button
          onClick={() => router.push(`?restaurant=${restaurant.id}`)}
          className="text-gray-700 dark:text-gray-300 text-left w-full space-y-1"
        >
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span className="text-sm truncate">{restaurant.address}</span>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-green-500" />
            <span className="text-sm truncate">{restaurant.openingHours}</span>
            <span
              className={`ml-auto px-2 py-0.5 text-xs font-semibold rounded-full shadow-md transition-all duration-300 ${
                openStatus
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {openStatus ? 'Open' : 'Closed'}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">
              {restaurant.averageStars.toFixed(1)} / 5
            </span>
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
            {restaurant.distance.toFixed(1)} KM
          </div>
        </button>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;

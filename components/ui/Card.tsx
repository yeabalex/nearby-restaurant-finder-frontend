import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star } from 'lucide-react';
import type { Restaurant } from '@/types/restaurant.type';
import { isOpenNow } from '@/utils/checkIfRestaurantIsOpen';
import Link from 'next/link';
interface RestaurantCardProps {
  restaurant: Restaurant;
}


const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const openStatus = isOpenNow(restaurant.openingHours);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow duration-300"
    >
 
      <h3 className="text-xl font-bold text-black dark:text-white">
        {restaurant.name}
      </h3>
      <Link href={`/restaurant/${restaurant.id}`} className="mt-2 space-y-2 text-gray-600">
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{restaurant.address}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          <span>{restaurant.openingHours}</span>
          <span
            className={`ml-3 px-2 py-1 text-sm font-semibold rounded ${
              openStatus ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {openStatus ? 'Open' : 'Closed'}
          </span>
        </div>
        <div className="flex items-center">
          <Star className="w-4 h-4 mr-2 text-yellow-500" />
          <span>{restaurant.averageStars.toFixed(1)}</span>
        </div>
        <div className="text-sm text-gray-500">
          {restaurant.distance.toFixed(1)} miles away
        </div>
      </Link>
    </motion.div>
  );
};

export default RestaurantCard;

"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, List, Utensils, Map } from "lucide-react";
import RestaurantCard from "@/components/ui/Card";
import FilterButton from "@/components/ui/FilterButton";
import { ViewToggle } from "../ui/ViewToggle";
import type { FilterButtonProps } from "@/components/ui/FilterButton";
import { ViewButtonProps } from "../ui/ViewToggle";
import { Restaurant } from "@/types/restaurant.type";
import { useRouter } from "next/navigation";


const RestaurantList = ({restaurants}:{restaurants:Restaurant[]}) => {
  const [sortBy, setSortBy] = useState<"open" | "rating" | "">("");
  const [view, setView] = useState<"list" | "map">("list");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortedRestaurants, setSortedRestaurants] = useState<Restaurant[]>([])
  const router = useRouter()

  const filterButton: FilterButtonProps[] = [
    {
      name: "Rating",
      isActive: sortBy === "rating",
      onClick: () => setSortBy("rating"),
    },
  ];

  const viewButton: ViewButtonProps[] = [
    {
      name: "List",
      icon: <List className="w-4 h-4" />,
      onClick: () => {setView("list"); router.push("?view=list")},
      isActive: view === "list",
    },
    {
      name: "Map",
      icon: <Map className="w-4 h-4" />,
      onClick: () => {setView("map"); router.push("?view=map")},
      isActive: view === "map",
    },
  ];
useEffect(()=>{
  setSortedRestaurants([...restaurants].sort((a, b) => {
    if (sortBy === "rating") {
      return b.averageStars - a.averageStars;
    }
    return 0;
  }))
},[sortBy])


  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 z-10 p-4 rounded-2xl shadow-sm mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Nearby Restaurants
              </h1>
            </div>
            <div className="sm:hidden flex flex-col gap-2">
              {viewButton.map((button, index) => (
                <ViewToggle key={index} {...button} />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {restaurants.length} restaurants found
            </div>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <span>Sort by</span>
              <ChevronDown
                className={`w-4 h-4 transform transition-transform duration-300 ${
                  filterOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          <AnimatePresence>
            {filterOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex gap-2 mt-4"
              >
                {filterButton.map((button, index) => (
                  <FilterButton key={index} {...button} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div layout className="space-y-4">
          {sortedRestaurants.length > 0 ? (
            sortedRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <RestaurantCard restaurant={restaurant} />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-gray-500 dark:text-gray-400"
            >
              No restaurants found
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RestaurantList;
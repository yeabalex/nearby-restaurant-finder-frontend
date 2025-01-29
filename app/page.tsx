'use client'
import RestaurantLandingPage from "@/components/restaurant";
import { Suspense } from "react";

export default function RestaurantsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Suspense fallback={<div>Loading...</div>}>
      <RestaurantLandingPage/>
      </Suspense>
    </main>
  );
}
// types.ts
export type Restaurant = {
    id: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    openingHours: string;
    reviews?: Review[];
    averageStars: number;
    distance: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export type Review = {
    id: number;
    content: string;
    rating: number;
    userId: number;
    restaurantId: number;
  }
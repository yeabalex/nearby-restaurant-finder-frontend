# Restaurant Finder App

## Overview
The **Restaurant Finder App** allows users to find nearby restaurants based on their current location. The app supports two main views:

1. **List View**: Displays a list of restaurants with key details.
2. **Map View**: Shows restaurants on a map, along with the user's current location.

The app sorts restaurants by rating and offers filtering options to sort the displayed restaurants.

## Features
- **Geolocation**: Fetches the user's current location and shows nearby restaurants.
- **Map Integration**: Provides a map view of the restaurant locations with the ability to select a restaurant.
- **View Toggle**: Users can switch between list and map views.
- **Restaurant Sorting**: Restaurants can be sorted by rating.
- **Dynamic Content**: Displays loading states and error handling.

## Tech Stack
- **React**: For building the user interface.
- **Next.js**: For server-side rendering and routing.
- **Framer Motion**: For animations and transitions.
- **GraphQL**: Used for fetching restaurant data from the backend.

## Installation
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.
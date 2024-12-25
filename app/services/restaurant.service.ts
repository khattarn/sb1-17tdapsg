import { Observable } from '@nativescript/core';

export interface Restaurant {
    name: string;
    cuisine: string;
    rating: string;
    videoThumbnail: string;
    description: string;
}

export class RestaurantService {
    private static instance: RestaurantService;
    private _restaurants: Restaurant[] = [
        {
            name: "Le Petit Bistro",
            cuisine: "French",
            rating: "4.5",
            videoThumbnail: "https://raw.githubusercontent.com/NativeScript/sample-assets/main/restaurant-1.jpg",
            description: "Authentic French cuisine in a cozy atmosphere"
        },
        {
            name: "Sushi Master",
            cuisine: "Japanese",
            rating: "4.8",
            videoThumbnail: "https://raw.githubusercontent.com/NativeScript/sample-assets/main/restaurant-2.jpg",
            description: "Fresh sushi and sashimi prepared by master chefs"
        },
        {
            name: "Pasta Paradise",
            cuisine: "Italian",
            rating: "4.3",
            videoThumbnail: "https://raw.githubusercontent.com/NativeScript/sample-assets/main/restaurant-3.jpg",
            description: "Homemade pasta and authentic Italian recipes"
        }
    ];

    private constructor() {}

    static getInstance(): RestaurantService {
        if (!RestaurantService.instance) {
            RestaurantService.instance = new RestaurantService();
        }
        return RestaurantService.instance;
    }

    getRestaurants(): Restaurant[] {
        return this._restaurants;
    }
}
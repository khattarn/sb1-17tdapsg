import { NavigatedData, Page, Observable } from '@nativescript/core';
import { AuthService } from './services/auth.service';
import { Navigator } from './navigation/navigator';
import { RestaurantService, Restaurant } from './services/restaurant.service';
import { CityService } from './services/city.service';

export class HomeViewModel extends Observable {
    private restaurantService: RestaurantService;
    private cityService: CityService;

    constructor() {
        super();
        this.restaurantService = RestaurantService.getInstance();
        this.cityService = CityService.getInstance();
    }

    get selectedCity(): string {
        return this.cityService.selectedCity;
    }

    get restaurants(): Restaurant[] {
        return this.restaurantService.getRestaurants();
    }

    get isLoggedIn(): boolean {
        return AuthService.getInstance().isLoggedIn;
    }

    onCityDropdownTap() {
        console.log("City dropdown tapped");
        const cities = this.cityService.availableCities;
        alert({
            title: "Select City",
            message: "City selection will be implemented with a proper dropdown in the next update",
            okButtonText: "OK"
        });
    }

    onSearchTap() {
        console.log("Search tapped");
        // For now just log the action
        alert("Search coming soon!");
    }

    onProfileTap() {
        console.log("Profile tapped");
        const authService = AuthService.getInstance();

        if (authService.isLoggedIn) {
            Navigator.navigate('profile-page');
        } else {
            Navigator.navigate('login-page');
        }
    }
}

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    if (!page.bindingContext) {
        page.bindingContext = new HomeViewModel();
    }
}
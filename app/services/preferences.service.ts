import { Observable } from '@nativescript/core';

export interface UserPreferences {
    favoriteCuisine?: string;
    favoriteRestaurant?: string;
    favoriteDish?: string;
    dietaryRestrictions?: string[];
    spiceLevelPreference?: string;
}

export class PreferencesService {
    private static instance: PreferencesService;
    private _preferences: UserPreferences = {};

    private constructor() {}

    static getInstance(): PreferencesService {
        if (!PreferencesService.instance) {
            PreferencesService.instance = new PreferencesService();
        }
        return PreferencesService.instance;
    }

    get preferences(): UserPreferences {
        return this._preferences;
    }

    updatePreferences(preferences: Partial<UserPreferences>) {
        this._preferences = { ...this._preferences, ...preferences };
    }
}